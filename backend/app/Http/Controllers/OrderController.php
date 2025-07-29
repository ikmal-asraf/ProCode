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
        // Step 1: Sort items by price DESC (best-fit decreasing)
        $sorted = $items->sortByDesc('price')->values();

        $packages = [];

        foreach ($sorted as $item) {
            $bestFitIndex = null;
            $minRemaining = 999999; // large number as initial

            foreach ($packages as $index => $package) {
                $packagePrice = collect($package)->sum('price');

                if (($packagePrice + $item['price']) <= 250) {
                    $remaining = 250 - ($packagePrice + $item['price']);

                    if ($remaining < $minRemaining) {
                        $minRemaining = $remaining;
                        $bestFitIndex = $index;
                    }
                }
            }

            if ($bestFitIndex !== null) {
                $packages[$bestFitIndex][] = $item;
            } else {
                $packages[] = [$item]; // create new package
            }
        }

        // Step 2:  Rebalance weight 
        $packages = $this->rebalanceWeight($packages);

        // Step 3: Format response
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

    private function rebalanceWeight(array $packages): array
    {
        // Flatten all items and sort by weight descending
        $allItems = collect($packages)->flatten(1)->sortByDesc('weight')->values();

        $packageCount = count($packages);
        $balanced = array_fill(0, $packageCount, []);
        $totals = array_fill(0, $packageCount, ['price' => 0, 'weight' => 0]);

        foreach ($allItems as $item) {
            $bestFitIndex = null;
            $minRemainingWeight = PHP_INT_MAX;

            foreach ($totals as $index => $stats) {
                // Only consider if package can take this item's price
                if (($stats['price'] + $item['price']) <= 250) {
                    $remainingWeight = $stats['weight'];
                    
                    if ($remainingWeight < $minRemainingWeight) {
                        $minRemainingWeight = $remainingWeight;
                        $bestFitIndex = $index;
                    }
                }
            }

            // If no package fits by price, drop to package with least weight anyway
            if ($bestFitIndex === null) {
                $bestFitIndex = collect($totals)->pluck('weight')->search(min(array_column($totals, 'weight')));
            }

            $balanced[$bestFitIndex][] = $item;
            $totals[$bestFitIndex]['price'] += $item['price'];
            $totals[$bestFitIndex]['weight'] += $item['weight'];
        }

        return $balanced;
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
