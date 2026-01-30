import { motion } from "motion/react";
import { Globe } from "../components/globe";
import { Frameworks } from "../components/Frameworks";
import { TYPO, GlassCard } from "../components/NewDesignUtils";

const Tech = () => {
    return (
        <section id="tech" className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Tech Stack Card */}
                    <GlassCard className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="mb-8 text-center">
                            <h3 className={`${TYPO.h2} text-3xl mb-2`}>Tech Stack</h3>
                            <p className={`${TYPO.body} text-sm underline decoration-cyan-400/30 underline-offset-4`}>
                                Tools I use to build digital ecosystems
                            </p>
                        </div>
                        <div className="w-full">
                            <Frameworks />
                        </div>
                    </GlassCard>

                    {/* Location/Globe Card */}
                    <GlassCard className="flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
                        <div className="mb-4 text-center z-10">
                            <h3 className={`${TYPO.h2} text-3xl mb-2`}>Global Presence</h3>
                            <p className={`${TYPO.body} text-sm`}>
                                Based in Tunisia (GMT+1/2), working with the world
                            </p>
                        </div>
                        <div className="relative w-full h-[300px] flex items-center justify-center">
                            <Globe className="w-full h-full scale-150" />
                        </div>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
};

export default Tech;
