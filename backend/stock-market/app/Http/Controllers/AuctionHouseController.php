<?php

namespace App\Http\Controllers;

use App\Models\AuctionHouse;
use App\Models\AuctionHouseCategory;
use Illuminate\Http\Request;

class AuctionHouseController extends Controller
{
    public function index(){
        return AuctionHouse::all();
    }

    public function cat(){
        return AuctionHouseCategory::all();
    }

    public function getAuctionHouseById($id){
        return AuctionHouse::find($id);
    }

    public function deleteAuctionHouse($id){
        $house = AuctionHouse::find($id);
        if($house) {
            return $house->delete($house);
        } else {
            return response()->json("Wrong id!" . $request, 400);
        }
    }


    public function findById($id){
        return AuctionHouseCategory::find($id);
    }

    public function createAuctionHouse(Request $request){
        if(! is_numeric($request->auction_house_category_id)){
            $resposne = (object) ['message' => "Id must be numeric!"];
            return response()->json($response, 400);
        }
        else if(is_null($request->title)) {
            $resposne = (object) ['message' => "Title is null"];
            return response()->json($response, 400);
        }

        else if(! strlen($request->description) > 2000){
            $resposne = (object) ['message' => "Description is too long!"];
            return response()->json($response, 400);
        }

        $id = number_format($request->id);
        if(isset($id)){
            $acutionHouse = AuctionHouse::find($id);
            error_log($id);
            error_log($acutionHouse);
            $acutionHouse->title = $request->title;
            $acutionHouse->type = $request->type;
            $acutionHouse->location = $request->location;
            $acutionHouse->description = $request->description;
            $acutionHouse->auction_house_category_id = $request->auction_house_category_id;

            $acutionHouse->save();
            return response()->json($acutionHouse, 201);
        }
        $acutionHouse = AuctionHouse::create($request->all());
        return response()->json($acutionHouse, 201);
    }
}


