const Lex = require('lexical-parser')

// exports.GetResult = async (req, res) => {
//     try {
//         let input = 'block { int a = 0 int b = 3 if (a < b && b > a) { print("Hello World") } }'

//         // You can specify an exact string or a regex for the token
//         let tokenMatchers = [
//             'block',
//             'if',
//             '{',
//             '}',
//             '(',
//             ')',
//             '<',
//             '>',
//             '=',
//             '&&',
//             'int',
//             ['integer', /[0-9]+/],
//             ['id', /[a-zA-Z][a-zA-Z0-9]*/],
//             ['string', /\".*?\"/],
//             'break',
//             'case',
//             'do',
//             'if',
//             'else if',
//             'else',
//             'for',
//             'return',
//             'switch',
//             'while'
//         ]
//         // The pattern to ignore in the input
//         let ignorePattern = '[\n\s \t]+'

//         let lex = new Lex(input, tokenMatchers, ignorePattern)
//         let tokenList = [];
//         let token = undefined
//         try {
//             do {
//                 token = lex.nextToken()
//                 console.log(token);
//                 if(token){
//                     tokenList.push(token);
//                 }
//             } while (token)
//             res.status(200).send(JSON.stringify(tokenList));
//         } catch (err) {
//             // Error handling
//             if (err.code === "LEXICAL_ERROR") {
//                 console.log(`\n${err.message}\n`)
//                 console.log(`Position: ${err.position}`)
//                 console.log(`Character: ${err.character}`)
//                 console.log(`Nearby code: ${err.nearbyCode}`)
//                 throw boom.conflict(err.message);

//             }
//             else {
//                 console.log(err)
//                 throw boom.conflict(err.message);
//             }
//         }
//     } catch (error) {
//         const { _code, _payload } = Helper.decorateErrorResponse(error);
//         console.log('Error', _code, _payload);
//         return res.status(_code).send({
//             code: _code,
//             message: _payload.message,
//         });
//     }
// };


exports.GetResult = async (req, res) => {
    try {
        const input = 'block { int a = 0 int b = 3 if (a < b && b > a) { print("Hello World") } }'
        const KEYWORDS = [
            'asm',
            'auto',
            'bool',
            'break',
            'case',
            'catch',
            'char',
            'class',
            'const',
            'const_cast',
            'continue',
            'default',
            'delete',
            'do',
            'double',
            'dynamic_cast',
            'else',
            'enum',
            'explicit',
            'export',
            'extern',
            'false',
            'float',
            'for',
            'for',
            'goto',
            'if',
            'inline',
            'int',
            'long',
            'mutable',
            'namespace',
            'new',
            'operator',
            'private',
            'protected',
            'public',
            'register',
            'reinterpret_cast',
            'return',
            'short',
            'signed',
            'sizeof',
            'static',
            'static_cast',
            'struct',
            'switch',
            'template',
            'this',
            'throw',
            'true',
            'try',
            'typedef',
            'typeid',
            'typename',
            'union',
            'unsigned',
            'using',
            'virtual',
            'void',
            'volatile',
            'wchar_t',
            'while',
            'print',
            'main',
        ];

        const OPERATORS = [
            '==',
            '!=',
            '>',
            '<',
            '>=',
            '<=',
            '&&',
            '||',
            '!'
        ];

        const ASSIGNMENTOPERATORS = [
            '=',
            '+=',
            '-=',
            '*=',
            '/=',
            '%=',
            '<<=',
            '>>=',
            '&=',
            '^=',
            '|=',
        ];

        const splitInput = input.split(' ');
        let TOKENLIST = [];
        await splitInput.map((item, index) => {
            if(KEYWORDS.indexOf(item) !== -1){
                TOKENLIST.push({
                    name: item,
                    lexname: 'Keyword',
                    position: index
                })
            }
            else if(OPERATORS.indexOf(item) !== -1){
                TOKENLIST.push({
                    name: item,
                    lexname: 'Operator',
                    position: index
                })
            }
            else if(ASSIGNMENTOPERATORS.indexOf(item) !== -1){
                TOKENLIST.push({
                    name: item,
                    lexname: 'Assignment Operator',
                    position: index
                })
            }
        })
        res.status(200).send(JSON.stringify(TOKENLIST));
    } catch (error) {
        const { _code, _payload } = Helper.decorateErrorResponse(error);
        console.log('Error', _code, _payload);
        return res.status(_code).send({
            code: _code,
            message: _payload.message,
        });
    }
};