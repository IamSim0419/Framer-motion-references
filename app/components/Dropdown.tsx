import { motion } from "framer-motion";

type DropdownType = {
    dropdownlinks: { label: string; href?: string }[];
}

export function DropDown({ dropdownlinks }: DropdownType) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10}}
            animate={{ opacity: 1, y: 0}}
            exit={{opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-8 left-0 bg-gray-700 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-lg w-52 overflow-hidden"
        >
            {dropdownlinks.map((link, index) => (
            <motion.div
                key={index}
                whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 cursor-pointer"
            >
                <a href={link.href}>
                {link.label}
                </a>
            </motion.div>
            ))}

        </motion.div>
    )
}