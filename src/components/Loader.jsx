import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary">
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-highlight text-[32px] font-bold mr-2">&lt;</span>
        <motion.span
          className="text-gradient text-[40px] font-extrabold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Carlos Rábago
        </motion.span>
        <span className="text-highlight text-[32px] font-bold ml-2">/&gt;</span>
      </motion.div>
      
      <motion.div
        className="mt-8 flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.div
          className="w-4 h-4 rounded-full bg-highlight"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.5, 1],
            delay: 0,
          }}
        />
        <motion.div
          className="w-4 h-4 rounded-full bg-highlight"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.5, 1],
            delay: 0.2,
          }}
        />
        <motion.div
          className="w-4 h-4 rounded-full bg-highlight"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.5, 1],
            delay: 0.4,
          }}
        />
      </motion.div>
      
      <motion.p 
        className="text-secondary mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        Cargando portfolio...
      </motion.p>
    </div>
  );
};

export default Loader; 