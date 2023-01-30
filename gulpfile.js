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

//Imagenes
//Estas siguientes dependencias son de imagenes
    const imagemin= require('gulp-imagemin');
    const cache = require('gulp-cache');
    const webp = require('gulp-webp');
    const avif=require('gulp-avif');

    function css(done){
    src('src/scss/**/*.scss')    //Identificar el archivo de SASS. Saber donde esta
        .pipe(plumber()) //lo que hace plumber es que en caso de que haya errores no tenga problemas y detenga el workflow
        .pipe( sass())//Compilarlo.
        .pipe( postcss([autoprefixer(),cssnano()]))
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
