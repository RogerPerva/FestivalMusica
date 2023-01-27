        document.addEventListener('DOMContentLoaded', function(){
            iniciarApp();
        });

    function iniciarApp(){
        crearGaleria();
    }

    function crearGaleria(){
        const galeria = document.querySelector('.galeria-imagenes');
    
            for(let i=1; i<=12; i++){
                const imagen=document.createElement('picture');
                imagen.innerHTML=`
                <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                
                <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                
                <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
                `;
    
                imagen.onclick = function(){
                    mostrarImagen(i);
                }
    /// ctl+D para seleccionar el siguiente elemento que sea similar al seleccionado.
                galeria.appendChild(imagen); //AppendChild es para agregar elementos.
                }
            }
    
            function mostrarImagen(id){
                const imagen=document.createElement('picture');
                imagen.innerHTML=`
                <source srcset="build/img/grande/${id}.avif" type="image/avif">
                
                <source srcset="build/img/grande/${id}.we bp" type="image/webp">
                
                <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
                `; console.log(`Mostrando imagen ${id} en pantalla`);
                
                
                //Crea el Overlay con la imagen
                const overlay =document.createElement('DIV'); //creamos overlay para oscurecer y agreamos un div
                overlay.appendChild(imagen);
                overlay.classList.add('overlay'); //agregamos una clase para darle estilos
                overlay.onclick=function(){
                    const body = document.querySelector('body');
                    body.classList.remove('fijar-body');
                    overlay.remove();
                }
               
                //Boton para cerrar la ventana modal
                const cerrarModal=document.createElement('P');
                cerrarModal.textContent='X';
                cerrarModal.classList.add('btn-cerrar');

                cerrarModal.onclick=function(){
                const body = document.querySelector('body');
                body.classList.remove('fijar-body');
                    overlay.remove();//para al dar click se cierre la imagen, removemos el overlay.
                }
                overlay.appendChild(cerrarModal);

                // Añadirlo al HTMl
                const body = document.querySelector('body');
                body.appendChild(overlay);//Seleccionamos 'body' y con appendchild agregamos el overla.
                body.classList.add('fijar-body');
            }


