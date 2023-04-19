document.title = 'Calculatrice Vanille';
h2  = document.createElement("h2");
// h2.textContent= 'html/css/JS';
h2.style.textTransform = "uppercase";
h1 = document.querySelector("h1");
h1.append(h2);

document.addEventListener("DOMContentLoaded", () => {
    let buttons =  document.querySelectorAll('button');
    let ecran = document.getElementById('ecranOUT');

    let nombre = "";
    let operateurs = [];
    let nombres = [];
    let resultat = 0;
    ecran.textContent = resultat;
    
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if(button.getAttribute('name') === 'chiffre' || (button.getAttribute('name') === 'point' && !isPoint(nombre))){
                nombre += button.getAttribute("id");
                ecran.textContent = nombre + ' ';
                //audio.play();
            }
            else if (button.getAttribute('name') === 'operateur'){
                operateurs.push(button.getAttribute("id"));
                nombres.push(Number(nombre));
                nombre = "";
                ecran.textContent += button.getAttribute("id") + ' ';
            }
            else if (button.getAttribute('id') === 'egale'){
                nombres.push(Number(nombre));
                resultat = operation(nombres, operateurs);
                operateurs = [];
                nombres = [];
                nombre = resultat;
                ecran.textContent = resultat;
            }
            else if (button.getAttribute('id') === 'clear'){
                nombre = "";
                operateurs = [];
                nombres = [];
                resultat = 0;
                ecran.textContent = resultat;
            }
        });
    });

    function isPoint(str){
        let p = false;
        for(let i = 0; i < str.length; i++) {
            if(str[i] === ".")
                p = true;
            }
        return p;
    }

    function operation(nombres, operateurs){
        let res = nombres[0];
        let nbr;
        
        for(let i = 0; i < operateurs.length; i++) {
                nbr = nombres[i+1];
                try{
                    switch(operateurs[i]) {
                        case "+":
                            res += nbr;
                            break;
                        case "-":
                            res -= nbr;
                            break;
                        case "*":
                            res *= nbr;
                            break;
                        case "/":
                            if ( nbr == 0 ){
                                throw new Error("Erreur: division par 0");
                            }
                            else res = res / nbr;
                            break;
                        default: alert('Commence avec un nombres, pas un opération.');
                    }
                }
                catch(e){
                    return e.message;
                }
            }
        return res;
    }
});
