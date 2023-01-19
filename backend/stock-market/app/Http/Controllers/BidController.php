<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BidController extends Controller
{
    public function test(){
        return "TEST PASSED";   
    }

    public function list(){
       return Bid::all();   
    }   

    public function findByItemId($id) {

        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);

        return Bid::select('bid.*', 'users.name')
            ->join('users','bid.user_id', '=', 'users.id')->where('item_id', $id)->get();
    }

    public function findMaxByItemId($id) {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);

        return Bid::select('*')->where('item_id', $id)->max('price');
    }

    public function findWinner($id){
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);

        return Bid::select('bid.*', 'users.name')
            ->join('users','bid.user_id', '=', 'users.id')
            ->where('item_id', $id)->max('price');
    }

    public function findByUserId($id){
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);

        return Bid::select('*')->where('user_id', $id)->get();
    }

    public function createBid(Request $request){

        $this->validate($request, [
            'price' => 'required|numeric|between:10,100000',
            'date' => 'required|after:yesterday',
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
        $max = Bid::select('bids')->max('price'); 
        $min = Bid::select('bids')->min('price'); 
        $cunt = Bid::select('bids')->count();

        $arr = array(
            "min" => $min,
            "max" => $max,
            "count" => $cunt,
        );

        return response()->json($arr, 201);
    }
    
    public function statsByUser($id) {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);
            
        $max = Bid::select('bids')->max('price')->where('user_id', $id); 
        $min = Bid::select('bids')->min('price')->where('user_id', $id); 
        $cunt = Bid::select('bids')->count()->where('user_id', $id);

        $arr = array(
            "min" => $min,
            "max" => $max,
            "count" => $cunt,
        );

        return response()->json($arr, 201);
    }


}
