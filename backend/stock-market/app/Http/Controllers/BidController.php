<?php

namespace App\Http\Controllers;

use App\Models\AuctionHouse;
use App\Models\Item;
use App\Models\User;
use App\Models\AuctionHouseCategory;
use Illuminate\Http\Request;

class BidController extends Controller
{
    public function test(){
        return "TEST PASSED";   
    }

    public function list(){
       return Bid::all();   
    }   

    public function findByItemId($id) {
        return Bid::select('*')->where('item_id', $id)->get();
    }

    public function findByUserId($id){
        return Bid::select('*')->where('user_id', $id)->get();
    }

    public function createBid(Request $request){

        $this->validate($request, [
            'id' => 'required|numeric',
            'title' => 'required|max:255',
            'date_started' => 'required|after:yesterday',
            'initial_price' => 'required|numeric|between:1,1000',
            'user_id' => 'exists:App\Models\User,id',
            'item_id' => 'exists:App\Models\Item,id',
        ]);

        $bid = Bid::create($request->all());
        return response()->json($bid, 201);
    }

    public function deleteBid($id) {
        $id = number_format($id);
        if(isset($id) && $id !=0){
            $item = Bid::find($id);
            $item->delete();
        }
        return response()->json($item, 201);
    }

    public function stats() {
        $max = DB::table('bids')->max('price'); 
        $min = DB::table('bids')->min('price'); 
        $cunt = DB::table('bids')->count();

        $arr = array();
        array_push($arr, $max, $min, $cunt);

        return response()->json($arr, 201);
    }
    
    public function statsByUser($id) {
        $max = DB::table('bids')->max('price')->where('user_id', $id); 
        $min = DB::table('bids')->min('price')->where('user_id', $id); 
        $cunt = DB::table('bids')->count()->where('user_id', $id);

        $arr = array();
        array_push($arr, $max, $min, $cunt);

        return response()->json($arr, 201);
    }


}
