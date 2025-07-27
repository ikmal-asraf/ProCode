<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Courier Charges by Weight
    |--------------------------------------------------------------------------
    |
    | This configuration defines the courier charges based on total package
    | weight in grams. The system will loop through these rules to determine
    | which charge applies.
    |
    */

    [
        'min' => 0,
        'max' => 200,
        'charge' => 5,
    ],
    [
        'min' => 201,
        'max' => 500,
        'charge' => 10,
    ],
    [
        'min' => 501,
        'max' => 1000,
        'charge' => 15,
    ],
    [
        'min' => 1001,
        'max' => 5000,
        'charge' => 20,
    ],


];
