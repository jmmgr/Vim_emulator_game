//document.getElementById("c0r0").innerHTML="Z";
//document.getElementById("c0r0").style.color="#0f0";
//document.getElementById("c0r0").style.backgroundColor="#fff";
	var position_x=0;
	var position_y=0;
	var most_x_know=0;
	var empty_rows =[];
	var change_mod=false;
	var supported_functions="Supported functions: h,j,k,l,0,$,r"
	init();
	document.getElementById("c79r23").style.backgroundColor="#0f0";
	set_string(0,0,"\tfunction h_pressed() {\n\t\tif (position_x >0){\n\t\t\tpass_focus(position_x,position_y,--position_x,position_y);\n\t\t\tmost_x_know =position_x;\n\t\t}\n\t}\n\tfunction l_pressed() {\n\t\tif (position_x <79 &&\n\t\t position_x<get_last_informed_column(position_y)){\n\t\t\tpass_focus(position_x,position_y,++position_x,position_y);\n\t\t\tmost_x_know =position_x;\n\t\t}\n\t}");

	write_empty_rows();			

	
	function init(){
		createTable();
		set_focus(0,0);
		 init_empty_rows(24);
		 document.getElementById("h1_tittle").innerHTML=supported_functions;
	}
	function createTable(){
		var table = document.createElement("table");
		  for(var j=0;j<24;j++){
			  var column = document.createElement("tr");
			  for(var i= 0;i<80;i++){
			      var cell = document.createElement("td");
			      cell.setAttribute("id","c"+i+"r"+j);
			      column.appendChild(cell);
			  }
			  table.appendChild(column);
		  }	
		  document.getElementById("table_div").appendChild(table);  
		
	}
	function init_empty_rows(arraySize){
		for (var i = 0; i < arraySize; i++) 
			empty_rows[i] = true; 
	}
	function write_empty_rows(){
		for(var i =0;i<24;i++){
			if(empty_rows[i]){
				set_value(0,i,'~');
				document.getElementById("c0r"+i).style.color="blue";
			}
		}
		
	}
	document.addEventListener('keypress', function(event) {
		if(!change_mod){
		    if(event.keyCode == 104) {
		    	h_pressed();   	
		    }
		    else if(event.keyCode == 108) {
		    	l_pressed();
		    }
		   else if(event.keyCode == 107) {
		        	k_pressed();
		    }
		   else if(event.keyCode == 106) {
		   		j_pressed();
		   }else if(event.keyCode == 48) {
			   		n0_pressed();
		   }else if(event.keyCode == 36) {
			   		sdollar_pressed();
		   }else if(event.keyCode == 114) {
		   		r_pressed();
		   }
		}else{
			var char =  String.fromCharCode(event.keyCode);
			set_value(position_x,position_y,char);
			change_mod=false;

		}
	});
	function n0_pressed() {
		var aux=get_first_informed_column(position_y);
		pass_focus(position_x,position_y,aux,position_y);
		position_x=aux;
		most_x_know =position_x;
	}
	function sdollar_pressed() {
		var aux=get_last_informed_column(position_y);
		pass_focus(position_x,position_y,aux,position_y);
		position_x=aux;
		most_x_know =position_x;
	}
	function r_pressed() {
		change_mod=true;
	}
	function h_pressed() {
		if (position_x >0 && position_x>get_first_informed_column(position_y)){
			pass_focus(position_x,position_y,--position_x,position_y);      
			most_x_know =position_x;
		}
	}
	function l_pressed() {
		if (position_x <79 && position_x<get_last_informed_column(position_y)){
			pass_focus(position_x,position_y,++position_x,position_y);    
			most_x_know =position_x;
		}
	}
	function j_pressed(){
		if (position_y <23 && position_y<get_last_informed_row()){
			if(most_x_know>=get_first_informed_column(position_y+1) && most_x_know<= get_last_informed_column(position_y+1)){
				pass_focus(position_x,position_y,most_x_know,++position_y);   
				position_x =most_x_know;
			}
			else if (most_x_know> get_last_informed_column(position_y+1)){
				var aux=get_last_informed_column(position_y+1);
				pass_focus(position_x,position_y,aux,++position_y);   
				position_x=aux;
			}else if (most_x_know< get_first_informed_column(position_y+1)){
				var aux=get_first_informed_column(position_y+1);
				pass_focus(position_x,position_y,aux,++position_y);
				position_x=aux;
				
			}
		}
	}
	function k_pressed() {
		if (position_y>0){
			if(most_x_know>=get_first_informed_column(position_y-1) && most_x_know<= get_last_informed_column(position_y-1)){
				pass_focus(position_x,position_y,most_x_know,--position_y);   
				position_x =most_x_know;
			}
			else if (most_x_know> get_last_informed_column(position_y-1)){
				var aux=get_last_informed_column(position_y-1);
				pass_focus(position_x,position_y,aux,--position_y);   
				position_x=aux;

			}else if (most_x_know< get_first_informed_column(position_y-1)){
				var aux=get_first_informed_column(position_y-1);
				pass_focus(position_x,position_y,aux,--position_y);   
				position_x=aux;

				
			}
		}
	}
	
	function pass_focus(x1,y1,x2,y2){
		document.getElementById("c"+x1+"r"+y1).style.backgroundColor="#000";
		document.getElementById("c"+x2+"r"+y2).style.backgroundColor="#fff";

	}
	function set_focus(x1,y1){
		document.getElementById("c"+x1+"r"+y1).style.backgroundColor="#fff";	
	}

	function set_string(x1,y1,string){
		var x = x1;
		var y = y1;
		empty_rows[y]=false;
		for(var i=0;i<string.length;i++){
			if(string.charAt(i)=='\t')
				x+=4;
			else if (string.charAt(i)=='\n'){
				y++;
				empty_rows[y]=false;
				x=0;
			}
			else
				set_value(x,y,string.charAt(i));
			if(x>79){
				x=0;
				if(y>23){
					y++;
					empty_rows[y]=false;
				}
			}else{ x++;}
//			document.getElementById("c"+x+"r"+y).innerHTML=string.charAt(i);
		}

	}
	function set_value(x,y,s){
	//	console.log(s);
		document.getElementById("c"+x+"r"+y).innerHTML = s;
	}
	function get_value(x,y){
		
		return document.getElementById("c"+x+"r"+y).innerHTML;
	}	
	function get_last_informed_column(row){
		var x=-1;
		for(var i=0;i<80;i++)
			if(get_value(i,row).length>0)
				x=i;
		
		return x;	
	}
	function get_first_informed_column(row){
		var x=-1;
		for(var i=70;i>=0;i--)
			if(get_value(i,row).length>0)
				x=i;
		
		return x;	
	}
	function get_last_informed_row(){
		for(var i =23;i>=0;i--){
			if(!empty_rows[i])
				return i;
		}
		return 0;
	}