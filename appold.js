


document.addEventListener('DOMContentLoaded',() => {

   
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
    
    // end dari deklrasi variabel



    function movePlatformDown(){
        const doodlerStyle = getComputedStyle(doodler);
        const doolderPosY = doodlerStyle.bottom.split('px')[0];
        if(!isJump && !isTouch && 44 === 1){
            getAllPlatfrom()
            .forEach((plat) => {
                const platStyle = getComputedStyle(plat);
                const platPosY = Number(platStyle.bottom.split('px')[0]);

                plat.style.bottom = (platPosY + 2) + 'px';
                if(isJump){
                    clearInterval(setMoveBawah);
                }
            })
        }
        // clearInterval(setMoveBawah);
    }

    const createPlatform = (prevPlatBottom,currentLeft) =>{
        const newPlat = document.createElement('div');
        newPlat.classList.add('platform');
        newPlat.style.bottom = prevPlatBottom + 'px';
        newPlat.style.left = currentLeft + 'px';
        
        return newPlat;

    }

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
    addPlatfrom();
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
    
    document.addEventListener('keyup',(eventKeyboard)=> {
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
            
    function jumpAfterLand(){
        if (isPlay){
            for(let i = 1; i <= 8; i++){
               setTimeout(() => doodleJump(),200)
            }
        }
    }


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



    


    const setDoodleDrop =  setInterval(() => {
        if(!isJump && !isTouch){
            doodleDrop();
        }
    },100);

    // const setMovePlat = setInterval(movePlat,200)

    // setDoodleDrop();
    
    const setCheckPos = setInterval(checkPos,100);
    // const setMoveBawah = setInterval(movePlatformDown,300);
    const getAllPlatfrom = () =>{
        return document.querySelectorAll('.platform');
    }


    function start(){
        const platform = getAllPlatfrom()
            .forEach((plat,index) => {
                if(index <= 0 ){
                    const stylePlat = getComputedStyle(plat);
                    doodler.style.bottom = (Number(stylePlat.bottom.split('px')[0]) + 20) + 'px';
                    doodler.style.left = (Number(stylePlat.left.split('px')[0]) + 45) + 'px';
                }
            })
    }


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
        const newPlatBottom = Number(getComputedStyle(plat).bottom.split('px')[0]) - 30;
        plat.style.bottom = newPlatBottom + 'px';
       })
       checkPalingAtas();
    }

    


    start();
    const radiusRange = document.getElementById('radius-jump');

    function randomValue(){
        const maxValue = 100;
        let randomValues = Math.round(Math.random() * 100);
        return randomValues;
    }
   
    const setRandomValue =  setInterval(() => {
    const newRadiusValue = randomValue()
    radiusRange.value = newRadiusValue;
    document.querySelector('.radiusPersentase').textContent = `Radius : ${newRadiusValue}%`
},600)

    const modalBoxWithChildren = document.querySelector('.modalBox').children;

    // instalasi eventListener
    Array.from(modalBoxWithChildren).forEach((child) => {
        child.children[4].addEventListener('click',()=>{
            child.classList.toggle('toogleDisplayNone');
            window.location.href = 'index.html';
        })
    })

    const checkPlatfromDivWithChild = document.querySelector('.checkPlatform').children; 

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


})