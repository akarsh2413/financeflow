import { motion } from "framer-motion";

const StatCard = ({ title, amount, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-600 font-medium text-lg">
          {title}
        </h3>

        <div className="text-3xl p-3 rounded-xl bg-slate-100">
          {icon}
        </div>
      </div>

      <h2 className="text-3xl font-bold text-slate-800">
        ₹{amount.toLocaleString()}
      </h2>
    </motion.div>
  );
};

export default StatCard;