component {
header name='Access-Control-Allow-Origin' value='*';

remote function Save(FoodID,Qty) {
	storedproc
		procedure='Food.[Save]' {
		procparam value=url.FoodID;
		procparam value=url.Qty;
	}
}

}
