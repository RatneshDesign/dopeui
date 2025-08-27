// https://codepen.io/GreenSock/pen/mdVEpKK

import { motion, AnimatePresence, animate } from 'framer-motion'
import React, { useEffect, useState } from 'react'

function Animation() {

    const [aniclose, setAniclose] = useState(false);

    useEffect(() => {
        let toggle = false;

        const loop = () => {
            toggle = !toggle;
            setAniclose(toggle);

            setTimeout(loop, 4000);
        };

        loop();
    }, []);


    const startpoint = {
        initial: { background: "#f1f1f1", scale: 1, borderColor: "#cbcbcb", boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.1)" },
        animate: { background: "#ffffff", scale: 1.1, borderColor: "#ffffff", boxShadow: "0px 4px 14px 0px rgba(0,0,0,0.1)", transition: { duration: 0.3, ease: 'circOut', delay: 0.2 } },
        exit: { background: "#f1f1f1", scale: 1, borderColor: "#cbcbcb", boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.1)", transition: { duration: 0.3, ease: 'circIn', delay: 1 } },


        initialimg: { translateY: 0, opacity: 0, scale: 1 },
        animateimg: { translateY: -10, opacity: 1, scale: .8, transition: { duration: 0.3, ease: 'easeInOut', delay: 0.2 } },
        exitimg: { translateY: 0, opacity: 0, scale: 1, transition: { duration: 0.3, ease: 'circIn', delay: 1 } },

        initiallable: { translateY: 10, opacity: 0 },
        animatelable: { translateY: -10, opacity: 1, transition: { duration: 0.3, ease: 'circOut', delay: 0.2 } },
        exitlable: { translateY: 20, opacity: 0, transition: { duration: 0.3, ease: 'circIn', delay: 1 } },


    }
    const container = {
        initial: { background: "#f1f1f1", scale: 1, borderColor: "#cbcbcb", boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.1)" },
        animate: { background: "#ffffff", scale: 1.1, borderColor: "#ffffff", boxShadow: "0px 4px 14px 0px rgba(0,0,0,0.1)", transition: { duration: 0.3, ease: 'circOut', delay: 1.45 } },
        exit: { background: "#f1f1f1", scale: 1, borderColor: "#cbcbcb", boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.1)", transition: { duration: 0.3, ease: 'circIn', delay: 2 } }
    }

    const pathanimation = {
        intial: { pathLength: 0,pathOffset :1 },
        animate: {
            pathLength: 1,
            pathOffset: 0,
            transition: {
                duration: 1,
                ease: "circIn",
                delay: 0.5
            }
        },
        exit: {
            pathLength: 0,
            pathOffset: 0,
            transition: {
                duration: 1,
                ease: "circIn",
                delay: 1
            }
        },
    }

    const imageani = {
        initial: { translateY: 0, opacity: 0, scale: 1 },
        animate: { translateY: -10, opacity: 1, scale: .8, transition: { duration: 0.3, ease: 'easeInOut', delay: 1.45 } },
        exit: { translateY: 0, opacity: 0, scale: 1, transition: { duration: 0.3, ease: 'circIn', delay: 2 } },

    }

    const lableani = {
        initial: { translateY: 10, opacity: 0 },
        animate: { translateY: -10, opacity: 1, transition: { duration: 0.3, ease: 'circOut', delay: 1.45 } },
        exit: { translateY: 20, opacity: 0, transition: { duration: 0.3, ease: 'circIn', delay: 2 } },
    }

    return (
        <>
            <div className='w-screen h-screen bg-[#f1f1f1] flex items-center justify-center relative'>

                {/* container here */}
                <AnimatePresence mode="wait">

                    <div className='w-[540px] absolute h-[540px] z-1 grid grid-cols-5 grid-rows-5 gap-[0px]'>
                        <div className='w-[200px] h-[250px] relative grid place-items-center row-start-1 row-end-3 col-start-1 col-end-3'>
                            <motion.svg width="260" height="73" viewBox="0 0 299 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <motion.path
                                    variants={pathanimation}
                                    initial="intial"
                                    animate={aniclose ? "exit" : "animate"}
                                    // transition={{ease : 'circIn'}}
                                    exit="exit"
                                    d="M297.5 0.5V21C297.5 21 298.5 48 284.5 60.5C270.5 73 241 71 241 71H0" stroke="url(#paint0_linear_1_9)" strokeWidth="2" />
                                <defs>
                                    <linearGradient id="paint0_linear_1_9" x1="298" y1="0.999959" x2="-1.15726e-06" y2="71" gradientUnits="userSpaceOnUse">
                                        <motion.stop
                                            offset="0.2"
                                            stopColor="#FF5888"
                                            animate={{ stopColor: ["#FF5888", "#58FFB1", "#0048FF", "#FF5888"] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                                        />
                                        <motion.stop
                                            offset="0.6"
                                            stopColor="#58FFB1"
                                            animate={{ stopColor: ["#58FFB1", "#0048FF", "#FF5888", "#58FFB1"] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                                        />
                                        <motion.stop
                                            offset="0.9"
                                            stopColor="#0048FF"
                                            animate={{ stopColor: ["#0048FF", "#FF5888", "#58FFB1", "#0048FF"] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                                        />
                                    </linearGradient>
                                </defs>
                            </motion.svg>
                        </div>

                        <div className='w-[320px] h-[300px] relative grid place-items-center row-start-1 row-end-3 col-start-2 col-end-3'>

                            <motion.svg width="2" height="150" viewBox="0 0 2 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <motion.line
                                    variants={pathanimation}
                                    initial="intial"
                                    animate={aniclose ? "exit" : "animate"}
                                    exit="exit"
                                    x1="1" y1="-4.37114e-08" x2="1.00001" y2="150" stroke="url(#paint0_linear_1_10)" strokeWidth="2" />
                                <defs>
                                    <linearGradient id="paint0_linear_1_10" x1="8.50029" y1="-2.43916e-07" x2="8.62664" y2="151.007" gradientUnits="userSpaceOnUse">
                                        <motion.stop
                                            offset="0.2"
                                            stopColor="#FF5888"
                                            animate={{ stopColor: ["#FF5888", "#58FFB1", "#0048FF", "#FF5888"] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                                        />
                                        <motion.stop
                                            offset="0.6"
                                            stopColor="#58FFB1"
                                            animate={{ stopColor: ["#58FFB1", "#0048FF", "#FF5888", "#58FFB1"] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                                        />
                                        <motion.stop
                                            offset="0.9"
                                            stopColor="#0048FF"
                                            animate={{ stopColor: ["#0048FF", "#FF5888", "#58FFB1", "#0048FF"] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                                        />
                                    </linearGradient>
                                </defs>
                            </motion.svg>

                        </div>


                    </div>
                </AnimatePresence>


                {/* container here */}

                <AnimatePresence mode="wait">


                    <div className='w-[540px] h-[540px] z-10  grid-cols-5 grid-rows-5 gap-[10px] grid'>


                        <motion.div
                            variants={startpoint}
                            initial={'initial'}
                            animate={aniclose ? "exit" : "animate"}
                            exit={'exit'}
                            className='row-start-1 col-start-3 w-[100px] z-3 h-[100px] border-1 overflow-hidden border-[#cbcbcb] bg-[#f1f1f1] relative p-[1.2em] rounded-[0.8em] grid place-items-center'>

                            <motion.img
                                initial={'initialimg'}
                                animate={aniclose ? "exitimg" : "animateimg"}
                                variants={startpoint}
                                src="/Images/star 1.svg" alt="" />
                            <motion.span
                                initial={'initiallable'}
                                animate={aniclose ? "exitlable" : "animatelable"}
                                variants={startpoint}
                            >
                                Label
                            </motion.span>

                        </motion.div>

                        <motion.div
                            initial={'initial'}
                            animate={aniclose ? "exit" : "animate"}
                            exit={'exit'}
                            variants={container}
                            className='row-start-2 col-start-1 w-[100px] z-3 h-[100px] border-1 overflow-hidden border-[#cbcbcb] bg-[#f1f1f1] relative p-[1.2em] rounded-[0.8em] grid place-items-center'>
                            <motion.img
                                initial={'initial'}
                                animate={aniclose ? "exit" : "animate"}
                                variants={imageani}
                                src="/Images/Group1.svg" alt="" />
                            <motion.span
                                initial={'initial'}
                                animate={aniclose ? "exit" : "animate"}
                                variants={lableani}
                            >
                                Label
                            </motion.span>

                        </motion.div>

                        <motion.div
                            initial={'initial'}
                            animate={aniclose ? "exit" : "animate"}
                            variants={container}
                            className='row-start-3 col-start-3 w-[100px] z-3 h-[100px] border-1 overflow-hidden border-[#cbcbcb] bg-[#f1f1f1] relative p-[1.2em] rounded-[0.8em] grid place-items-center'>
                            <motion.img
                            className='mt-3'
                                initial={'initial'}
                                animate={aniclose ? "exit" : "animate"}
                                variants={imageani}
                                src="/Images/Group5.svg" alt="" />
                            <motion.span
                                initial={'initial'}
                                animate={aniclose ? "exit" : "animate"}
                                variants={lableani}

                            >
                                Label
                            </motion.span>

                        </motion.div>

                    </div>
                </AnimatePresence>

            </div>
        </>
    )
}

export default Animation