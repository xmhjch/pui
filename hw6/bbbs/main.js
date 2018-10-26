
var priceList = [4.18, 3.58, 2.99, 2.88, 2.98, 4.28];
var nameList = ["Blackberry", "Walnut", "Pumpkin Spice", "Original", "Original Gluten Free", "Caramel Peacon"];
var numInCart = 0;
var picList = ["res/blackberry_m.png", "res/walnut_m.png", "res/pumpkin_m.png", "res/original_m.png", "res/originalgf_m.png", "res/caramel_m.png"];
var pageList = ["item/blackberry.html", "item/walnut.html", "item/pumpkin.html", "item/original.html", "item/originalgf.html", "item/caremel.html"];
var totalPrice = 0;

var defaultIndex = -1;
var defaultTotal = 0;
var defaultGlazing = "";
var defaultQuant = 0;




var storageList = localStorage.getItem("LocalList");
if(storageList == null){
		storageList = "";
}

var totalPrice = Number(localStorage.getItem("LocalPrice"));
if(isNaN(totalPrice)){
		totalPrice = 0;
}

var numInCart = Number(localStorage.getItem("LocalNum"));
if(isNaN(numInCart)){
		numInCart = 0;
}







// prepare the script that will be inserted into the cart
function readyItemToCart(nameIndex, quant, glaz){
	var total = defaultTotal;
	numInCart += 1;
	totalPrice += pre(total);
	storageList += "<div class='item'><div class='numAndSelectDiv'>\
					<div class = 'checkbox'>" + numInCart + ".</div>\
				</div>\
				<div class='itempicDiv'>\
					<img class = 'itempic' src=" + picList[nameIndex] + ">\
				</div>\
				<div class='infoDiv'>\
					<div class='infoName'>" + nameList[nameIndex] + "</div>\
					<div class='infoQuant'>Quant: <div class='cartOption cartQuantO'>" + quant + "</div></div>\
					<div class='infoGlaz'>Glazing: <div class='cartOption cartGlazO'>" + glaz + "</div></div>\
				</div>\
				<div class='priceButtonDiv'>\
					<div class='itemPrice'>$" + displayNum(total) + "</div>\
					<div class='twobuttons'>\
						<button class = 'remove smallButton pinkhover'>REMOVE</button>\
					</div>\
				</div>\
				<hr class='line1'>\
			</div>";
	localStorage.setItem("LocalList", storageList);
	localStorage.setItem("LocalPrice", totalPrice.toString());
	localStorage.setItem("LocalNum", numInCart.toString());

}

// push the script into cart
function addItemToCart(){
	var list = $('.listOfItem');
	list.empty();
	list.append(storageList);
}

// updating the sum of cost for the cart
function changeSum(){
	var price = $('#priceHolder');
	price.empty();
	
	price.append("<div class='totalPrice'>" + displayNum(totalPrice) + "</div>");

				
}

function deleteSum(){
	var price = $('#priceHolder');
	price.empty();
}

//prepare number for display
function pre(num){
	return Number((Math.round((num * 1000)/10)/100).toFixed(2));
}

//prepare number for display
function displayNum(num){
	return (Math.round((num * 1000)/10)/100).toFixed(2);
}


//update cart icon on the top
function changeCartBar(){
	var items = document.getElementsByClassName('cartT');
	var newp = document.createElement('p');
	newp.textContent = "CART (" + numInCart + ")" ;

  	for (var i=0; i < items.length; i++) {
  		while(items[i].hasChildNodes()){
  			items[i].removeChild(items[i].childNodes[0]);
  		}
  		items[i].appendChild(newp);
  	}
  	

}


//cart icon animation
function CartBarAnimation(){
	$('.topcart > a > img').animate({width: "150%"}, 500);
  	$('.topcart > a > img').animate({width: "77%"}, 500);
}


//change item display price
function changeItemDisplayPrice(){
	var price = $('.price');
	price.text(defaultTotal.toString());
}

//update the name of the item
function changeItemDisplayName(){
	var name = $('.name');
	name.text(nameList[defaultIndex]);
}


//add related item to the list
function addProductsToRelated(){
	for (var i = 0; i < nameList.length; i++) {
		if(i != defaultIndex){
			addOneProductToRelated(i);
		}
	}

}

//prepare script for one individual item to add to the list of related
function addOneProductToRelated(nameIndex){
	var related = $('.figuresR');
	var name = nameList[nameIndex];
	var price = priceList[nameIndex];
	var picadd = "../" + picList[nameIndex];
	var pageadd = "../" + pageList[nameIndex];

	related.append("<a href='" + pageadd + "'>\
			<figure class='figureR'>\
				<img class = 'itemimgR imghover' src='" + picadd + "' alt='" + name + "'>\
				<figcaption class = 'figcaptionR'>" + name + "</figcaption>\
				<figcaption class = 'figcaptionR'>From $" + price + "</figcaption>\
			</figure>\
			</a>");
}


//add item to cart
$(document).on("click", ".toCart", function(){
	readyItemToCart(defaultIndex, defaultQuant, defaultGlazing);
	storageList = localStorage.getItem("LocalList");
	if(storageList == null){
		storageList = "";
	}
	addItemToCart();

	totalPrice = Number(localStorage.getItem("LocalPrice"));
	if(isNaN(totalPrice)){
			totalPrice = 0;
	}

	changeSum();

	numInCart = Number(localStorage.getItem("LocalNum"));
	if(isNaN(numInCart)){
			numInCart = 0;
	}

	changeCartBar();
	CartBarAnimation();

});


//prepare page, ready cart, update lists
$(document).ready(function(){
	storageList = localStorage.getItem("LocalList");
	if(storageList == null){
		storageList = "";
	}
	addItemToCart();

	totalPrice = Number(localStorage.getItem("LocalPrice"));
	if(isNaN(totalPrice)){
			totalPrice = 0;
	}

	changeSum();

	numInCart = Number(localStorage.getItem("LocalNum"));
	if(isNaN(numInCart)){
			numInCart = 0;
	}

	changeCartBar();




	defaultIndex = Number($('.pageIndex').text());
	defaultQuant = 1;
	defaultGlazing = "N/A";
	defaultTotal = pre(priceList[defaultIndex]) * pre(defaultQuant);

	changeItemDisplayPrice();
	changeItemDisplayName();




	$('.overlayCart').hide();
	$('.overlayCart').css("visibility", "visible");

	$('.topcart').mouseenter(function(){

		$('.overlayCart').fadeIn("slow");
	});

	$('.overlayCart').mouseleave(function(){
		$('.overlayCart').fadeOut("slow");
	});


	$('.itemChoiceShop').mouseleave(function(){
		$('.itemChoiceShop').fadeOut("slow");
	});


	addProductsToRelated();



});

//remove specific item from list
$(document).on("click", ".remove", function() {
	var removedItem = $(this).parent().parent().parent().parent().html();
	//console.log(removedItem);
	//storageList = storageList.substring(0, storageList.length - removedItem.length);
	var newp = $(this).parent().parent().parent().parent();
	var numStr = $(this).parent().parent().children()[0].innerHTML;
	
	var num = Number(numStr.substring(1, numStr.length));
    $(this).parent().parent().parent().remove();


    

    totalPrice -= pre(num);
    numInCart -= 1;
    deleteSum();
    changeSum();
    localStorage.setItem("LocalPrice", totalPrice.toString());
	localStorage.setItem("LocalNum", numInCart.toString());



	for (var i = 1; i <= numInCart; i++) {

		$('.listOfItem').children().eq(i-1).children().eq(0).children().eq(0).remove();
		$('.listOfItem').children().eq(i-1).children().eq(0).append("<div class = 'checkbox'>" + i + ".</div>");
		//console.log($('#listOfItem').children().eq(i-1).children().eq(0));

	}

	storageList = newp.html();
    localStorage.setItem("LocalList", storageList);

    changeCartBar();





});



//number selection
$(document).on("click", ".option1", function(){
	$('.option1').removeClass("pink");
	$(this).addClass("pink");
	defaultQuant = Number($(this).text());
	defaultTotal = pre(priceList[defaultIndex]) * pre(defaultQuant);
	changeItemDisplayPrice();

});

//glazing selection
$(document).on("click", ".option2", function(){
	$('.option2').removeClass("pink");
	$(this).addClass("pink");
	defaultGlazing = $(this).text();
});





//add item to cart on shop page
$(document).on("click", '.tocart', function(){
	defaultIndex = Number($("> .itemIndex", this).text());
	console.log(defaultIndex);
	defaultTotal = pre(priceList[defaultIndex]) * pre(defaultQuant);
	changeItemDisplayName();
	changeItemDisplayPrice();
	$('.itemChoiceShop').hide();
	$('.itemChoiceShop').css("visibility", "visible");


	$('.itemChoiceShop').fadeIn("slow");



});



//add to cart function for hover paga
$(document).on("click", '.SmalltoCart', function(){

	readyItemToCart(defaultIndex, defaultQuant, defaultGlazing);
	storageList = localStorage.getItem("LocalList");
	if(storageList == null){
		storageList = "";
	}
	addItemToCart();

	totalPrice = Number(localStorage.getItem("LocalPrice"));
	if(isNaN(totalPrice)){
			totalPrice = 0;
	}

	changeSum();

	numInCart = Number(localStorage.getItem("LocalNum"));
	if(isNaN(numInCart)){
			numInCart = 0;
	}

	changeCartBar();
	CartBarAnimation();





	$('.itemChoiceShop').fadeOut("slow");




});




//related list, left control
$(document).on("click", ".controllerL", function(){
	$(".figuresR").animate( { scrollLeft: '-=800' }, 800);
});


//related list, right control
$(document).on("click", ".controllerR", function(){
	$(".figuresR").animate( { scrollLeft: '+=800' }, 800);
});













	













