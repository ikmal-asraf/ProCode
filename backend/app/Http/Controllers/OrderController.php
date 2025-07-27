<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function placeOrder(Request $request)
    {
        \Log::info('Incoming items:', $request->all());
        $items = collect($request->input('items'));

        if ($items->isEmpty()) {
            return response()->json(['message' => 'No items selected.'], 400);
        }

        $packages = $this->splitIntoPackages($items);

        return response()->json(['packages' => $packages]);
    }


    private function splitIntoPackages($items)
    {
        $items = $items->sortByDesc('price'); // Sort items by price for better distribution

        $packages = [];
        $currentPackage = [];
        $currentTotal = 0;

        foreach ($items as $item) {
            if (($currentTotal + $item['price']) >= 250) {
                if (!empty($currentPackage)) {
                    $packages[] = $currentPackage;
                }
                $currentPackage = [$item];
                $currentTotal = $item['price'];
            } else {
                $currentPackage[] = $item;
                $currentTotal += $item['price'];
            }
        }

        if (!empty($currentPackage)) {
            $packages[] = $currentPackage;
        }

        // Build response with weight, total, courier cost
        return collect($packages)->map(function ($group, $index) {
            $totalWeight = collect($group)->sum('weight');
            $totalPrice = collect($group)->sum('price');

            return [
                'package_number' => $index + 1,
                'items' => collect($group)->pluck('name')->toArray(),
                'total_weight' => $totalWeight,
                'total_price' => round($totalPrice, 2),
                'courier_price' => $this->calculateCourierCharge($totalWeight),
            ];
        })->toArray();
    }

    private function calculateCourierCharge($weight)
    {
        $rules = config('courier');

        foreach ($rules as $rule) {
            if ($weight >= $rule['min'] && $weight <= $rule['max']) {
                return $rule['charge'];
            }
        }

        return 0; // fallback
    }
}
