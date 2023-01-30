//      -------- ejemplo
            // function tarea( done ){
            //     console.log('mi primer tarea');

            //     done(); //tambien llamado callback, utilizado para dar a conocer que se finalizo la tarea
            // }

            // exports.tarea = tarea; //la parte del lado izquierdo es lo que manda a llamar, es decir es el nombre.

            // //para mandarlo a llamar desde el binario de gulp (gulpfile.js) es: npx gulp (nombre de la tarea)

            //src sirve para identificar el archivo y dest sirve para guardarlo.
   
///!!!!!!!!!!!!!!!!!!! Para ejecutar los archivos de gulp, utilizamos 'npx gulp (nombre de tarea)'
const {src, dest, watch, series, parallel} = require('gulp');

//Dependencias de CSS
    const sass = require ("gulp-sass")(require("sass"));
    const plumber = require("gulp-plumber");
    const autoprefixer=require ('autoprefixer');//Va a asegurarse en el navegador que definamos
    const cssnano = require('cssnano');         //comprime nuestro codigo css
    const postcss = require ('gulp-postcss');  //postcss hace algunas tranforamaciones 
    const sourcemaps = require('gulp-sourcemaps'); //Esta funcion nos ayuda a buscar el codigo css despues de haber sido comprimido
//Imagenes
//Estas siguientes dependencias son de imagenes
    const imagemin= require('gulp-imagemin');
    const cache = require('gulp-cache');
    const webp = require('gulp-webp');
    const avif=require('gulp-avif');
//Javascript
    const terser =require('gulp-terser-js');


    function css(done){
    src('src/scss/**/*.scss')    //Identificar el archivo de SASS. Saber donde esta
        .pipe(sourcemaps.init()) //Inicialiar el sourcemap y va a ir guardando la referencia.
        .pipe(plumber()) //lo que hace plumber es que en caso de que haya errores no tenga problemas y detenga el workflow
        .pipe( sass())//Compilarlo.
        .pipe( postcss([autoprefixer(),cssnano()])) //Esto comprime el codigo de css.
        .pipe(sourcemaps.write('.'))//le decimos donde se va a guardar, en este caso solo ponemo un punto para que sea la misma ubicacion donde se va aguardar de css
        .pipe(dest("build/css")); //Almacenarla en el disco duro
    //PIPE es una accion que se realiza despues de otra, es decir, en cadena.
    //Se pueden tener multiples pipes.
    done(); //callback que avisa cuando llegamos al final de la ejecucion.
}
    function imagenes(done){
    const opciones={
        optimizationLevel: 3 //Aligerar en una optimizacion de nivel 2, podemos encontrar mas opciones en GitHub.
    };
    
    src('src/img/**/*.{png,jpg}')//Seleccionamos todas las imagenes
    .pipe(cache(imagemin(opciones))) //las convertimos 
    .pipe(dest('build/img')); //y las almacenamos
    done();
}
    function versionWebp(done){
    const opciones={
        quality: 50
    };
    
    src('src/img/**/*.{png,jpg}')//Seleccionamos todas las imagenes
    .pipe(webp(opciones)) //las convertimos 
    .pipe(dest('build/img')); //y las almacenamos
    done();
}
    function versionAvif(done){
    const opciones={
        quality: 50
    };
    
    src('src/img/**/*.{png,jpg}')//Seleccionamos todas las imagenes
    .pipe(avif(opciones)) //las convertimos 
    .pipe(dest('build/img')); //y las almacenamos
    done();
}

    function javascript(done){
        src('src/js/**/*.js')
            .pipe( sourcemaps.init())
            .pipe( terser())
            .pipe( sourcemaps.write('.'))
            .pipe(dest('build/js'));

            done();
    }
    function dev(done){
    watch("src/scss/**/*.scss",css); //esta observando por cambios en todos los archivos scss
    watch("src/js/**/*.js",javascript); //queda escuchadno por los cambios en js
    
    done();
}

exports.versionWebp = versionWebp; 
exports.versionAvif = versionAvif; 
exports.css=css;
exports.js=javascript;
exports.imagenes = imagenes;
exports.dev= parallel(versionWebp, versionAvif, imagenes, javascript, dev); //PARALLEL ejecuta las dos tareas al mismo tiempo, pero debemos importarlo en el inicio del gulpfile.js
