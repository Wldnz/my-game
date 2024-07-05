const platform = document.querySelectorAll('.platform');
           platform.forEach((value,index) => {
            console.log( index  +  ". Left :" + getComputedStyle(value).left);
            console.log( index  +  ". Bottom    " + getComputedStyle(value).bottom);
            console.log(' ');
    })

    // setInterval(function(){
    //     const platform = document.querySelectorAll('.platform')
    //     .forEach((plat) =>{
    //         const doodlerStyle = getComputedStyle(doodler);
    //         const platStyle = getComputedStyle(plat);
    //         const doodlerPosY = doodlerStyle.bottom.split('px')[0] - platStyle.bottom.split('px')[0];
    //         const doodlerPosX = Math.round(doodlerStyle.left.split('px')[0]);
    //         const leftPosNumber = Math.round(Number( platStyle.left.split('px')[0]));
    //         if(doodlerPosY >= 20 && doodlerPosY <= 100){
    //             for(let leftPos = (leftPosNumber - 30); leftPos <= (leftPosNumber + 150); leftPos++){
    //                 if(leftPos == doodlerPosX){
    //                     console.log('dapat')
    //                    if(!isJump){
    //                         doodler.style.bottom = ((Number(platStyle.bottom.split('px')[0]) + 20)) +'px';
    //                         doodler.style.left = leftPos + 'px';
    //                         isJump = true;
    //                         isTouch = true;
    //                         if (isPlay){
    //                             for(let i = 0; i <= 8; i++){
    //                                 setTimeout(() => doodleJump(),200)
    //                             }
    //                             isPlay = false;
    //                         }
                           
    //                    }
    //                 }
    //             }
    //         }
    //     })
    //     console.log('Selesai!');
    // },500)