import jwt from 'jsonwebtoken'

export function signJwt(object: Object, options?:jwt.SignOptions|null){
    const user = {... object} as any
    return jwt.sign(JSON.parse(JSON.stringify(user)),'hino',{...options&&options})
}

export function verifyJwt<T>(token: string): T | null{
    try {
        const decoded = jwt.verify(token, 'hino') as T
        if(decoded){
            return decoded
        }
        return null
    } catch(err) {
        return null
    }

}