<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

use App\Http\Controllers\UserController;

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->post('/register', 'AuthController@register');
    $router->post('/login', 'AuthController@login');

    $router->group(['middleware' => 'auth'], function () use ($router) {
        $router->post('/logout', 'AuthController@logout');
    }
    );
});

$router->group(['prefix' => '/api/user'], function () use ($router) {
    $router->get('test', 'UserController@test');

    $router->get('list', 'UserController@list');
    $router->get('findByEmail', 'UserController@findByEmail');
    $router->get('findById/{id}', 'UserController@findById');
});

$router->group(['prefix' => '/api/auction'], function () use ($router) {
    $router->get('test', 'AuctionHouseController@test');
    $router->get('auctionHouse', 'AuctionHouseController@list');
    $router->get('getAuctionHouseById/{id}', 'AuctionHouseController@getAuctionHouseById');
    $router->post('auctionHouse', 'AuctionHouseController@createModifyAuctionHouse');
    $router->get('deleteAuctionHouse/{id}', 'AuctionHouseController@deleteAuctionHouse');
    
    $router->get('auctionsHouseCat', 'AuctionHouseController@listCat');
    $router->get('auctionsHouseCat/{id}', 'AuctionHouseController@getAuctionHouseCatById');
    $router->post('auctionHouseCat', 'AuctionHouseController@createAuctionHouseCat');
    $router->delete('auctionHouseCat', 'AuctionHouseController@deleteAuctionHouseCat');
});

$router->group(['prefix' => '/api/item'], function () use ($router) {
    $router->get('test', 'ItemController@test');
    
    $router->group(['middleware' => 'auth'], function () use ($router) {
        $router->get('list', 'ItemController@list');
    });
    $router->get('findById/{id}', 'ItemController@findById');
    $router->get('findByUserId/{id}', 'ItemController@findByUserId');
    $router->get('findByAuctionHouseId/{id}', 'ItemController@findByAuctionHouseId');
    $router->get('findItemCategoryById/{id}', 'ItemController@findItemCategoryById');

    $router->delete('delete/{id}', 'ItemController@deleteItem');
    $router->put('createItem', 'ItemController@createItem');
});

$router->group(['prefix' => '/api/bid'], function () use ($router) {
    $router->get('test', 'BidController@test');

    $router->get('list', 'BidController@list');
    $router->get('findByUserId/{id}', 'BidController@findByUserId');
    $router->get('findByItemId/{id}', 'BidController@findByItemId');
    $router->get('findMaxByItemId/{id}', 'BidController@findMaxByItemId');
    $router->post('createBid', 'BidController@createBid');
    $router->get('stats', 'BidController@stats');
    $router->post('statsByUser/{id}', 'BidController@statsByUser');
});