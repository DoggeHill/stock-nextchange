<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{

    public function test(){
        return "TEST PASSED";   
    }

    public function list(){
       return Item::with('user')->get();   
    }   

    public function findById($id) {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);

        return Item::find($id);
    }

    public function findByUserId($id){
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);

        return Item::select('*')->where('user_id', $id)->get();
    }

    public function createItem(Request $request){

        $this->validate($request, [
            'id' => 'numeric',
            'title' => 'required|max:255',
            'initial_price' => 'required|numeric|between:10,100000',
            'date_started' => 'required|after:yesterday',
            'date_finish' => 'required|after:yesterday',
            'description' => 'required|max:2555',
            'image' => 'required',
            'auction_house_id' => 'exists:App\Models\AuctionHouse,id',
            'user_id' => 'exists:App\Models\User,id',
            'item_category_id' => 'exists:App\Models\ItemCategory,id',
        ]);
       
        $id = number_format($request->id);
        if(isset($id) && $id !=0){
            $item = $this->listItem($id);
            $item->title = $request->title;
           
            $item->save();
            return response()->json($item, 201);
        }

        $item = Item::create($request->all());
        return response()->json($item, 201);
    }

    public function deleteItem($id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);

        $item = Item::find($id);
        if ($item) {
            return $item->delete($item);
        } else {
            return response()->json("Auction house does not exist id!" . $id, 400);
        }
    }

    public function findItemCategoryById($id) {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);
            
        return ItemCategory::find($id);
    }
}