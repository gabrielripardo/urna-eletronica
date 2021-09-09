<template>
    <div class="urna-teclado">
        <div class="urna-teclado-numerico">
            <div class="urna-teclado-numerico-linha">
                <button>1</button>
                <button>2</button>
                <button>3</button>
            </div>
            <div class="urna-teclado-numerico-linha">
                <button>4</button>
                <button>5</button>
                <button>6</button>
            </div>
            <div class="urna-teclado-numerico-linha">
                <button>7</button>
                <button>8</button>
                <button>9</button>
            </div>
            <div class="urna-teclado-numerico-linha">
                <button>0</button>                
            </div>
        </div>
        
        <div class="urna-teclado-acoes">
            <button class="btn-branco">BRANCO</button>
            <button class="btn-corrige">CORRIGE</button>
            <button class="btn-confirma">CONFIRMA</button>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'Teclado'
    }
</script>

<style>
    .urna-teclado{
        display: flex;
        flex-direction: column;
        justify-content: space-around;        
        width: 40%;
        height: 100%;
        background-color: var(--ballot-box-keyboard-color);        
        border-radius: 5px;
        padding:20px
    }

    .urna-teclado-numerico{
        width: 100%;      
    }

    .urna-teclado-numerico-linha{
        display: flex;        
        justify-content: space-around;
    }

    .urna-teclado-numerico button{
        background-color: var(--ballot-box-keyboard-button-color);
        color: var(--light-text-color);
        font-size: 30px;
        width: 80px;
        height: 50px;
        margin: 10px;
    }
    .urna-teclado-acoes{
        display: flex;
        justify-content: space-around;
    }
    .urna-teclado-acoes button{
        color: var(--dark-text-color);
        border-radius: 5px;
        font-size: 15px;
        width: 30%;
        height: 50px;        
    }

    .btn-branco{
        background-color: var(--ballot-box-white-button-color)
    }

    .btn-corrige{
        background-color: var(--ballot-box-correct-button-color)
    }

    .btn-confirma{
        background-color: var(--ballot-box-confirm-button-color)
    }
</style>