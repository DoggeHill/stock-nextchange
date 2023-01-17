<?php

namespace App\Http\Controllers;

use App\Models\AuctionHouse;
use App\Models\AuctionHouseCategory;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuctionHouseController extends Controller
{

    //* Test
    public function test()
    {
        return "TEST PASSED";
    }

    //* Auction house 
    public function list()
    {
        return AuctionHouse::all();
    }

    public function getAuctionHouseById($id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);

        return AuctionHouse::find($id);

    }

    public function deleteAuctionHouse($id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);


        $house = AuctionHouse::find($id);
        if ($house) {
            return $house->delete($house);
        } else {
            return response()->json("Auction house does not exist id!" . $id, 400);
        }
    }

    public function createModifyAuctionHouse(Request $request)
    {
        $this->validate($request, [
            'id' => 'numeric',
            'title' => 'required|max:255|unique:auction_house_category',
            'description' => 'max:2555',
            'location' => 'required|max:255',
            'auction_house_category_id' => 'exists:App\Models\AuctionHouseCategory,id',
        ]);

        $id = number_format($request->id);
        if (isset($id) && $id != 0) {
            $auctionHouse = AuctionHouse::find($id);
            $auctionHouse->title = $request->title;
            $auctionHouse->type = $request->type;
            $auctionHouse->location = $request->location;
            $auctionHouse->description = $request->description;
            $auctionHouse->auction_house_category_id = $request->auction_house_category_id;

            $auctionHouse->save();
            return response()->json($auctionHouse, 201);
        }
        $auctionHouse = AuctionHouse::create($request->all());
        return response()->json($auctionHouse, 201);
    }

    //* Auction house category
    public function listCat()
    {
        return AuctionHouseCategory::all();
    }

    public function getAuctionHouseCatById($id)
    {
        return AuctionHouseCategory::find($id);
    }

    public function createAuctionHouseCat(Request $request)
    {
        $this->validate($request, [
            'id' => 'numeric',
            'title' => 'required|max:255|unique:auction_houses',
            'item_category_id' => 'exists:App\Models\ItemCategory,id',
        ]);
        $auctionHouse = AuctionHouseCategory::create($request->all());
        return response()->json($auctionHouse, 201);
    }

    public function deleteAuctionHouseCat($id)
    {
        $house = AuctionHouseCategory::find($id);
        if ($house) {
            return $house->delete($house);
        } else {
            return response()->json("Auction house category does not exist id!" . $id, 400);
        }
    }
}