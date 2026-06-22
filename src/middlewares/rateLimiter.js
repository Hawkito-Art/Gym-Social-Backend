const requests = new Map()
export const rateLimiter = (options = {}) => {
    const { windowMs = 15 * 60 * 1000, max = 5 } = options

    return (req, res, next) => {
        if (process.env.NODE_ENV === 'test') return next()

        const ip = req.ip
        const now = Date.now()
        const record = requests.get(ip)

        if (!record || now > record.resetTime) {
            requests.set(ip, { count: 1, resetTime: now + windowMs })
            return next()
        }  
        if (record.count >= max) {
            return res.status(429).json({
            error: 'Too many requests, please try again later.'
            })
        }
        record.count++
        next()
    }
}