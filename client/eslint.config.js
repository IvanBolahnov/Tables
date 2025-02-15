import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import importPlugin from "eslint-plugin-import"

export default tseslint.config(
	{ ignores: ["dist"] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			import: importPlugin
		},
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					varsIgnorePattern: "^_",
					argsIgnorePattern: "^_"
				}
			],
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true }
			],
			"import/order": [
				"error",
				{
					groups: [
						"builtin", // Встроенные зависимости
						"external", // Внешние зависимости
						"parent", // Родительские импорты
						"sibling", // Импорты из того же каталога
						"index", //  Импорт index.js
						"object", // Импорты объектов
						"type" // Импорты типов
					],
					pathGroups: [
						{
							pattern: "@/**/**", //  Пути, начинающиеся с @
							group: "parent",
							position: "before"
						}
					],
					alphabetize: { order: "asc" } // Сортировка по алфавиту
				}
			]
		}
	}
)
