import gsap from 'gsap';

const animations = {
    stagger(refArr, callback) {
        gsap.from(
            refArr,
            {
                duration: 1,
                height: 0,
                stagger: 0.15,
                ease: "elastic(0.5, 0.8)",
                onComplete: callback
            });
    },

};

export default animations;