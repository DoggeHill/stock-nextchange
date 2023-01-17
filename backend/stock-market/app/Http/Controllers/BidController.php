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
            ->join('users','bid.user_id', '=', 'users.id')->get();
    }

    public function findMaxByItemId($id) {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);

        return Bid::select('*')->where('item_id', $id)->max('price');
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
            'price' => 'required|numeric',
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
        $max = DB::table('bids')->max('price'); 
        $min = DB::table('bids')->min('price'); 
        $cunt = DB::table('bids')->count();

        $arr = array();
        array_push($arr, $max, $min, $cunt);

        return response()->json($arr, 201);
    }
    
    public function statsByUser($id) {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);
            
        $max = DB::table('bids')->max('price')->where('user_id', $id); 
        $min = DB::table('bids')->min('price')->where('user_id', $id); 
        $cunt = DB::table('bids')->count()->where('user_id', $id);

        $arr = array();
        array_push($arr, $max, $min, $cunt);

        return response()->json($arr, 201);
    }


}
