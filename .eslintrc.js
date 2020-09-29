const base = require('@zefiros/npm-defaults/.eslintrc.base.js')

module.exports = {
    ...base,
    rules: {
        ...base.rules,
        '@typescript-eslint/ban-types': [
            'error',
            {
                extendDefaults: true,
                types: {
                    object: false,
                },
            },
        ],
    },
}
