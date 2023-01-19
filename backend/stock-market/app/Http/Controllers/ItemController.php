<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\ItemCategory;
use Illuminate\Http\Request;
use App\Models\AuctionHouse;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{

    public function test(){
        return "TEST PASSED";   
    }

    public function list(){
       return Item::with('user')->get();   
    }   

    public function listCategory(){
        return ItemCategory::all();   
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

    public function findByAuctionHouseId($id){
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        if ($validator->fails())
            abort(404);

    
        return Item::select('item.*', 'users.name')->where('auction_house_id', $id)->join('users','item.user_id', '=', 'users.id')->get();
    }

    public function createItem(Request $request){

        $id = number_format($request->id);
        if(isset($id) && $id !=0){
            $item = $this->findById($id);
            var_dump($item);
            $item->title = $request->title;
            $item->description = $request->description;
            $item->image = $request->image;
           
            $item->save();
            return response()->json($item, 201);
        }

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

        $itemCatIr = AuctionHouse::where('id', $id)->get(['auction_house_category_id']);
        
        return ItemCategory::find($itemCatIr);
    }

    public function findItemCategoryByIdId($id) {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|numeric'
        ]);

        
        return ItemCategory::find($id);
    }
}