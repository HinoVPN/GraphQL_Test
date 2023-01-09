import jwt from 'jsonwebtoken'

export function signJwt(object: Object, options?:jwt.SignOptions|null){
    const user = {... object} as any

    return jwt.sign(JSON.parse(JSON.stringify(user)),'hino',{...options&&options})
}

export function verifyJwt<T>(token: string): T | null{
    // console.log('token',token)
    const decoded = jwt.verify(token, 'hino') as T
    // console.log(token,1,decoded)
    if(decoded){
        return decoded
    }
    return null

}