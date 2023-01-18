//      -------- ejemplo
            // function tarea( done ){
            //     console.log('mi primer tarea');

            //     done(); //tambien llamado callback, utilizado para dar a conocer que se finalizo la tarea
            // }

            // exports.tarea = tarea; //la parte del lado izquierdo es lo que manda a llamar, es decir es el nombre.

            // //para mandarlo a llamar desde el binario de gulp (gulpfile.js) es: npx gulp (nombre de la tarea)

            //src sirve para identificar el archivo y dest sirve para guardarlo.
   
///!!!!!!!!!!!!!!!!!!! Para ejecutar los archivos de gulp, utilizamos 'npx gulp (nombre de tarea)'

            const {src, dest, watch} = require("gulp");
    const sass = require ("gulp-sass")(require("sass"));

function css(done){
    
    
    src('src/scss/app.scss')    //Identificar el archivo de SASS. Saber donde esta
        .pipe( sass())//Compilarlo.
        .pipe(dest("build/css")); //Almacenarla en el disco duro
    //PIPE es una accion que se realiza despues de otra, es decir, en cadena.
    //Se pueden tener multiples pipes.
    
    done(); //callback que avisa cuando llegamos al final de la ejecucion.
}

function dev(done){
    watch("src/scss/app.scss",css);
    
    
    done();
}

exports.dev=dev;
exports.css=css;