import Ajv,  { _ } from 'ajv'
import addFormats from 'ajv-formats'

describe('ajv test', () => {
  const ajv = new Ajv({ allErrors: true })

  const schema = {
    type: 'object',
    properties: {
      foo: {type: 'integer'},
      bar: {type: 'string'}
    },
    required: ['foo'],
    additionalProperties: false
  }
  
  const validate = ajv.compile(schema)

  describe('basic case', () => {
    const data = {
      foo: 1,
      bar: 'abc'
    }
    
    const valid = validate(data)

    it (' should return true', () => {
      expect(valid).toBe(true)
    })
  })

  describe('basic wrong case', () => {
    const data = {
      foo: 'test',
      bar: 1
    }
    
    const valid = validate(data)

    it (' should return false', () => {
      expect(valid).toBe(false)
    })

    it (' should have some error message ', () => {
      expect(validate.errors.length).toBe(2)
    })

    it (' should be "test"', () => {
      expect(validate.errors[0]).toStrictEqual({
        instancePath: '/foo',
        keyword: 'type',
        message: 'must be integer',
        params: {
          type: 'integer'

        },
        schemaPath: '#/properties/foo/type'
      })
    })

    it (' should be "test1"', () => {
      expect(validate.errors[1]).toStrictEqual({
        instancePath: '/bar',
        keyword: 'type',
        message: 'must be string',
        params: {
          type: 'string'

        },
        schemaPath: '#/properties/bar/type'
      })
    })
  })
})

describe('ajv addKeyword', () => {
  const ajv = new Ajv({ allErrors: true })


  // describe(' asynchronous validation', () => {
  //   // all keywords used by the schema must be added

  //   ajv.addKeyword({
  //     keyword: 'idExists',
  //     async: true,
  //     type: 'number',
  //     validate: checkIdExists,
  //   })

  //   function checkIdExists(schema, data) {
  //     // const rows = await sql(`SELECT id FROM ${schema.table} WHERE id = ${data}`)
  //     // return !!rows.length // true if record is found
  //     if (data > 10 ) { 
  //       const errorMessage = 'Too big.';
  //       const err = new Error(errorMessage);
  //       err.errors = [{
  //         code: 123,
  //         message: errorMessage,
  //       }];
  //       return Promise.reject(err)
  //     }
  //     return Promise.resolve(true)
  //   }

  //   const schema = {
  //     $async: true,
  //     type: 'object',
  //     properties: {
  //       userId: {
  //         type: 'integer',
  //         idExists: { table: 'users' },
  //       },
  //       postId: {
  //         type: 'integer',
  //         idExists: {table: 'posts'},
  //       },
  //     },
  //   }
    
  //   const validate = ajv.compile(schema)
    

  //   it ('{userId: 1, postId: 19} return too big', async () => {

  //     try {
  //        await validate({userId: 1, postId: 19})
  //     } catch( e) {
  //       expect(typeof e).toBe('object')
  //       expect(e.message).toBe('Too big.')
  //     }    
  //   })

  //   it ('{userId: 1, postId: 9} return too big', async () => {
  //       const result = await validate({userId: 1, postId: 9})
  //       expect(result).toStrictEqual({ userId: 1, postId: 9} )
  //   })
  // })

  describe(' recommended way to add keywords', () => {
    // all keywords used by the schema must be added

    ajv.addKeyword({
      keyword: "even",
      type: "number",  // value type to validate
      schemaType: "boolean",   // expected validation type
      // $data: true // to support [$data reference](./guide/combining-schemas.md#data-reference), ...
      code(cxt) {
        const {data, schema} = cxt   // 'data' is the value to validate, 'schema' is the value of the 'even' parameter - true for even, false for odd
        const op = schema ? _`!==` : _`===`
        cxt.fail(_`${data} % 2 ${op} 0`) // ... the only code change needed is to use `cxt.fail$data` here
      },
    })
    
    const evenSchema = { 
      type: 'number', // the type the schema validates
      even: true      // keyword constraing for the value
    }
    const isEven = ajv.compile(evenSchema)

    it (' should return true',  () => {
      expect(isEven(4)).toBe(true)
    })

    it (' should return false',  () => {
      expect(isEven(3)).toBe(false)
    })

    const oddSchema = { 
      type: 'number', 
      even: false 
    }
    const isOdd = ajv.compile(oddSchema)

    it (' should return true', () => {
      expect(isOdd(3)).toBe(true)
    })
  })


  describe(' using predefined formats', () => {
    // initialize ajv
    addFormats(ajv)

    const schema = {
      type: "string",
      format: "date",
      formatMinimum: "2016-02-06",
      formatExclusiveMaximum: "2016-12-27",
    }
    
    const validDataList = ["2016-02-06", "2016-12-26"]
    
    const invalidDataList = ["2016-02-05", "2016-12-27", "abc"]

    const isValidDate = ajv.compile(schema)

    it (' should return true',  () => {
      const dateValid = isValidDate(validDataList[0])
      expect(dateValid).toBe(true)
      
    })

    it (' should return false',  () => {
      const dateValid = isValidDate(invalidDataList[0])
      expect(dateValid).toBe(false)
    })
  })
})