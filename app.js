
// tampilan setelah refactoring

document.addEventListener('DOMContentLoaded',() => {

    // deklarasi variabel
    let amountPlatform = 20;
    let gravityDoodle = 20;
    let prevPlatBottom = 30;
    let prevPlatLeft = 0;

    let isJump = false;
    let isTouch = true;
    let isPlay = false;
    let isOver = false;
    let isUp = false;

    // array isi platForm
    let arrPlat = [];

     //   deklarasi element 
     const divRoot = document.querySelector('.root');
     const doodler = document.querySelector('.doodler');
     const radiusRange = document.getElementById('radius-jump');
     const modalBoxWithChildren = document.querySelector('.modalBox').children;
     const checkPlatfromDivWithChild = document.querySelector('.checkPlatform').children; 
     // end deklarasi

    // end dari deklrasi variabel


     // handle postition bagian platfrom
     function checkPalingAtas(){
        const platPalingAtasNichs = getAllPlatfrom()
        const platPalingAtasNich = platPalingAtasNichs[platPalingAtasNichs.length - 1];
        const platPalingAtasPosY = Number(getComputedStyle(platPalingAtasNich).bottom.split('px')[0]);

        const doodlerPosY = Number(getComputedStyle(doodler).bottom.split('px')[0]);


        if(doodlerPosY >= platPalingAtasPosY){
            gameOver(true);
        }

    }

    function movePlat(){
        if(!isPlay) return;
       getAllPlatfrom()
       .forEach((plat,index) => {
        const platStyle = getComputedStyle(plat);
        const platPosY = Number(platStyle.bottom.split('px')[0]);
        
        const doodlerStyle = getComputedStyle(doodler);
        const doodlerPosY = Number(doodlerStyle.bottom.split('px')[0])

        if(doodlerPosY >= 500){
            const newPlatBottom = Number(getComputedStyle(plat).bottom.split('px')[0]) - 100;
            plat.style.bottom = newPlatBottom + 'px';
        }else{
            const newPlatBottom = Number(getComputedStyle(plat).bottom.split('px')[0]) - 30;
            plat.style.bottom = newPlatBottom + 'px';
        }
        
    
    })
       checkPalingAtas();
    }

    const getAllPlatfrom = () =>{
        return document.querySelectorAll('.platform');
    }


    // end dari handle position


    // untuk membuat platform
    const createPlatform = (prevPlatBottom,currentLeft) =>{
        const newPlat = document.createElement('div');
        newPlat.classList.add('platform');
        newPlat.style.bottom = prevPlatBottom + 'px';
        newPlat.style.left = currentLeft + 'px';
        
        return newPlat;

    }
    // untuk menambahkan platform ke dalam html
    function addPlatfrom(){
        for(let i = 1; i <= amountPlatform; i++){
           // random math untuk horizontal
           const currentLeft  = Math.random()  * 350;
   
           const createPlat = createPlatform(prevPlatBottom,currentLeft);
           divRoot.appendChild(createPlat);
   
           arrPlat.push(createPlat);
   
           prevPlatLeft = currentLeft;
           // default 150
          if(arrPlat.length % 2 === 0){
               prevPlatBottom += 180;
          }else{
           prevPlatBottom += 130;
          }
        }
       }

       function setPosDoodler (){
         getAllPlatfrom()
            .forEach((plat,index) => {
                if(index <= 0 ){
                    const stylePlat = getComputedStyle(plat);
                    doodler.style.bottom = (Number(stylePlat.bottom.split('px')[0]) + 20) + 'px';
                    doodler.style.left = (Number(stylePlat.left.split('px')[0]) + 45) + 'px';
                }
        })}

        // handleMoveDoodle
        function doodleJump(){
            let newDoodle = Number(getComputedStyle(doodler).bottom.split('px')[0]) + gravityDoodle;
            doodler.style.bottom = newDoodle + 'px';
            isJump = isPlay = true;
            isTouch = false;
            const giveIsJump = setTimeout(()=> isJump = false,100)
        }
    
        function doodleDrop(){
            
            // if(!isJump && !isTouch) return;
            let newDoodle = Number(getComputedStyle(doodler).bottom.split('px')[0]) - gravityDoodle;
            const doodlderBottom = (Number(getComputedStyle(doodler).bottom.split('px')[0]));
    
            const doodleBottom = Number(getComputedStyle(doodler).bottom.split('px')[0]);
            if(doodleBottom <= 0) {
                gameOver(false);
                return;
            }
                doodler.style.bottom = newDoodle + 'px';
            isJump = false;
        }

        
        
    function moveLeft(){
        
        if(!isPlay) doodleJump();
        
        isPlay = true;
        let doodlerPosX = Number(getComputedStyle(doodler).left.split('px')[0]);
        let newDoodle = doodlerPosX - (gravityDoodle + 20);
        if(newDoodle <= 0) return;
        doodler.style.left = newDoodle + 'px';
        
    }

    function moveRight(){
        
        if(!isPlay) doodleJump();
        
        isPlay = true;
        let doodlerPosX = Number(getComputedStyle(doodler).left.split('px')[0]);
        let newDoodle = doodlerPosX + (gravityDoodle + 20);
        if(newDoodle >= 440) return;
        doodler.style.left = newDoodle + 'px';
        
    }

    function jumpAfterLand(){
        if (isPlay){
            for(let i = 1; i <= 8; i++){
               setTimeout(() => doodleJump(),200)
            }
        }
    }

    // kunci untuk menggerakan doodle

    document.addEventListener('keyup',(eventKeyboard)=> 
        {
            const keyboardKey = eventKeyboard.key;
            switch(keyboardKey){
                case 'w':
                    doodleJump();
                    break;
                case 'ArrowDown':
                    // doodleDrop();
                    break;
                case 'a':
                    moveLeft();
                    break;
                case 'd':
                moveRight();
                    break;
            }
    });



    // end dari handle move ^^

    // handle position (!Important!)
    function checkPos(){
        if(isOver) return;
        getAllPlatfrom()
        .forEach((plat) => {
            const doodlerStyle = getComputedStyle(doodler);
            const platStyle = getComputedStyle(plat);
            const platX = Math.round(Number(platStyle.left.split('px')[0]));
            const platY = platStyle.bottom.split('px')[0];
            const doodlerX = Math.round(doodlerStyle.left.split('px')[0]);
            const doodlerY = doodlerStyle.bottom.split('px')[0];
           
            const betweenPosY = Number(doodlerY) - Number(platY);
            if(betweenPosY >= 20 && betweenPosY <= 50){
                for(let checkPosX = (platX - 30); checkPosX <= (platX + 150); checkPosX++){
                    if(checkPosX == doodlerX){
                        if(!isJump){
                            doodler.style.bottom = ((Number(platY)) + 20) + 'px';
                            doodler.style.left = checkPosX + 'px';
                            isJump = isTouch = isUp= true;
                            movePlat();
                            jumpAfterLand()
                            checkPlatFrom();
                        }
                    }
                }
            }
        })
    }

        // untuk menghandle game over
        function gameOver(isWin){
            if (isWin){
                modalBoxWithChildren[0].classList.toggle('toogleDisplayNone');
            }else{
                modalBoxWithChildren[1].classList.toggle('toogleDisplayNone')
            }
            isOver = true;
            clearInterval(setCheckPos);
            clearInterval(setDoodleDrop);
            clearInterval(setRandomValue);
        }
    

        // handle global intervall

        const setDoodleDrop =  setInterval(() => {
            if(!isJump && !isTouch){
                doodleDrop();
            }
        },100);

        const setCheckPos = setInterval(checkPos,100);


        // end dari intervall


        //function untuk memulai awal game. 
       function start()
       {
           addPlatfrom();
           setPosDoodler(); 
       }
        
        

    //  start program 
        start();
    //






    //    query css handle disini

   


    // function handle progress

    function randomValue(){
        const maxValue = 100;
        let randomValues = Math.round(Math.random() * 100);
        return randomValues;
    }


    function checkPlatFrom(){
        const getAllPlatfroms = Array.from(getAllPlatfrom())
        const passPlat = getAllPlatfroms.filter((plat) => {
            const doodlerStyle = getComputedStyle(doodler);
            const platStyle = getComputedStyle(plat);
            const doodlderPosY = Number(doodlerStyle.bottom.split('px')[0]);
            const platPosY = Number(platStyle.bottom.split('px')[0]);

            if(doodlderPosY >= platPosY){
                return plat;
            }
        })

        checkPlatfromDivWithChild[0].textContent = `Total Platfrom: ${getAllPlatfrom().length}`;
        checkPlatfromDivWithChild[1].textContent = `You passed : ${passPlat.length}`;
        checkPlatfromDivWithChild[2].textContent = `Platfrom On Going : ${getAllPlatfrom().length - passPlat.length}`;
        checkPlatfromDivWithChild[3].textContent = `Your Progress : ${(passPlat.length / getAllPlatfrom().length) * 100}%`;


    }

    // end progress

    // interval

    const setRandomValue =  setInterval(() => {
        const newRadiusValue = randomValue()
        radiusRange.value = newRadiusValue;
        document.querySelector('.radiusPersentase').textContent = `Radius : ${newRadiusValue}%`
    },600)

    // end interval

    // instalasi menambahkan listener click pada button modalBox
     // instalasi eventListener
     Array.from(modalBoxWithChildren).forEach((child) => {
        child.children[4].addEventListener('click',()=>{
            child.classList.toggle('toogleDisplayNone');
            window.location.href = 'index.html';
        })
    })


    // end dari query css




})