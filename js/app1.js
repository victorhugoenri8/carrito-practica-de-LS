const vaciar=document.getElementById("vaciar-carrito");
const listaCursos=document.querySelector("#lista-carrito tbody");
let l=document.getElementById("carrito");
let carrito=document.getElementById("lista-carrito");
let boton=document.getElementsByClassName("agregar-carrito");




listeners();

  function listeners () {

		document.addEventListener("DOMContentLoaded", contenidoAlDom);

 		vaciar.addEventListener("click", vaciarCarrito);

		carrito.addEventListener("click", borrardelDom);
	};


for(var i = 0; i < boton.length; i++){
	
	boton[i].addEventListener("click", function (e) {
		
	pintar(e.target.parentNode.parentNode);
	//checar(e.target.parentNode.parentNode);
	//guardarDatosALocalStorage(e.target.parentNode.parentNode);
	
	});
};

function guardarDatosALocalStorage (e) {

        const r={ 

			 src:e.children[0].getAttribute("src"),
			 text:e.children[1].children[0].textContent,
		     precio:e.children[1].children[3].children[0].textContent,

            };
    
		let datosDeLS=obtenerDatosDeLS();
            datosDeLS.push(r);
				

	    localStorage.setItem("datos", JSON.stringify(datosDeLS));
	    
};

function obtenerDatosDeLS() {

	let nn;
	   if (localStorage.getItem("datos") === null) {
	   	  nn=[];
	   } else {
	   	   nn=JSON.parse(localStorage.getItem("datos"));
	   }
	   return nn;
};

// checar si el curso esta en el carrito si no añadirlo y envirlo a LS inconcluso
// function checar (e) {
//       let ff=obtenerDatosDeLS();
//       let te=e.children[1].children[0].textContent;

//       if (typeof(carrito.children[1].children[0])==="undefined") {
      	
//      						 pintar(e);
//       				} else if() {
//            						ff.forEach(function(ff, index){
//     	           					 if(ff.text===te){
//     		    						alert("rsentns")
//     									}
//    								 });



//       						}

//       						else {

//            				pintar(e);
//     											// let nne=pintar(e);
//     		  							//   carrito.children[1].appendChild(nne);
    		
//     											}
      
//  };


function pintar (e) {
	     r={ 

			 src:e.children[0].getAttribute("src"),
			 text:e.children[1].children[0].textContent,
		     precio:e.children[1].children[3].children[0].textContent,

            };

		let li=document.createElement("tr");
		let inc;
		inc=`<td><img src="${r.src}" width="100"></td>
		      <td>${r.text}</td>
		      <td>${r.precio}</td>
		      <td><a href="#" class="borrar-curso"> X</a></td>
		 `;
		li.innerHTML=inc;

 		carrito.children[1].appendChild(li);
 		guardarDatosALocalStorage(e);
	};

function borrardelDom (e) {
	  e.preventDefault();
	  if (e.target.className==="borrar-curso") {
	  	e.target.parentNode.parentNode.remove();
	  };
      let j=e.target.parentElement.parentElement;
	  let r={ 
		 src:j.children[0].children[0].getAttribute("src"),
		 text:j.children[1].textContent,
         pre:j.children[2].textContent,
     };
	 
        
	  borrarTweetLocalStorage(r);

};

   
function borrarTweetLocalStorage(r) {
           let tweet;

            tweet = obtenerDatosDeLS();
               let en=Object.values(tweet);
                  en.forEach(function(tweet, index){
    	                          if(tweet.text===r.text){
    		                                en.splice(index, 1);
    		                         }
    	                    });
                 localStorage.setItem("datos", JSON.stringify(en));
          };

function contenidoAlDom (){
	    const ee= obtenerDatosDeLS();

		ee.forEach(function (e){
		let li=document.createElement("tr");
		let inc;
		inc=`<td><img src="${e.src}" width="100"></td>
		      <td>${e.text}</td>
		      <td>${e.precio}</td>
		      <td><a href="#" class="borrar-curso"> X</a></td>
		 `;
		li.innerHTML=inc;

		 carrito.children[1].appendChild(li);
      });
   };

function vaciarCarrito () {
   while (listaCursos.firstChild) {
   	  listaCursos.removeChild(listaCursos.firstChild);
   }

   vaciartotal();
};

function vaciartotal () {
	localStorage.removeItem("datos");
}
