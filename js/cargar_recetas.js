const API_SERVER = 'https://www.themealdb.com/api/json/v1/1';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    }
};

// Función para cargar recetas en la parte de tendencias
const cargarRecetasTendencia = async (page = 1, numRecetas = 4) => {
    try {
        const recetas = [];
        
        for (let i = 0; i < numRecetas; i++) {
            const response = await fetch(`${API_SERVER}/random.php`, options);
            const data = await response.json();
            recetas.push(...data.meals);
        }

        const tendenciasContainer = document.querySelector('.recetasTendencia .recetas');
        tendenciasContainer.innerHTML = '';

        recetas.forEach(recipe => {
            const ancla = document.createElement('a');
            ancla.href = './templates/detalle.html';
            
            const receta = document.createElement('div');
            receta.classList.add('receta');
            
            const img = document.createElement('img');
            img.classList.add('imgTendencia');
            img.src = `${recipe.strMealThumb}/preview`; 
            img.alt = recipe.strMeal;
            img.loading = 'lazy';
            
            const tituloReceta = document.createElement('div');
            tituloReceta.classList.add('tituloReceta');
            
            const titulo = document.createElement('h4');
            titulo.textContent = recipe.strMeal;
            
            ancla.appendChild(receta);
            receta.appendChild(img);
            receta.appendChild(tituloReceta);
            tituloReceta.appendChild(titulo);
            tendenciasContainer.appendChild(ancla);
        });

        tendenciasContainer.parentElement.setAttribute('data-page', page);
    } catch (error) {
        console.error('Error al cargar las recetas de tendencia:', error);
    }
};

// Función para cargar recetas en la parte de aclamadas
const cargarRecetasAclamadas = async (numRecetas = 5) => {
    try {
        const recipes = [];
        
        for (let i = 0; i < numRecetas; i++) {
            const response = await fetch(`${API_SERVER}/random.php`, options);
            const data = await response.json();
            recipes.push(...data.meals);
        }
        
        const aclamadasContainer = document.querySelector('.aclamadas');
        aclamadasContainer.innerHTML = ''; // Limpiar el contenedor

        recipes.forEach(recipe => {
            const recetaItem = document.createElement('div');
            recetaItem.classList.add('recetaItem');
            
            const img = document.createElement('img');
            img.classList.add('imgAclamada');
            img.src = `${recipe.strMealThumb}/preview`; 
            img.alt = recipe.strMeal;
            img.loading = 'lazy';
            
            recetaItem.appendChild(img);
            aclamadasContainer.appendChild(recetaItem);
        });
    } catch (error) {
        console.error('Error al cargar las recetas aclamadas:', error);
    }
};

const botonAnterior = document.getElementById('botonAnterior');
const botonSiguiente = document.getElementById('botonSiguiente');
const seccionTendencias = document.getElementById('tendencias');

botonAnterior.addEventListener('click', () => {
    let currentPage = Number(seccionTendencias.getAttribute('data-page'));
    if (currentPage <= 1) return;
    cargarRecetasTendencia(currentPage - 1);
});

botonSiguiente.addEventListener('click', () => {
    let currentPage = Number(seccionTendencias.getAttribute('data-page'));
    cargarRecetasTendencia(currentPage + 1);
});

document.addEventListener('DOMContentLoaded', () => {
    cargarRecetasTendencia();
    cargarRecetasAclamadas();
});





