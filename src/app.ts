import express, {Application, json, urlencoded} from 'express'
import {
  sanitizeBodys,
  sanitizeHeadersAndQueryParams,
} from './middlewares/sanitization'
import featureRouter from './routes/featureRoutes'

const app: Application = express()

app.use(sanitizeHeadersAndQueryParams)
app.use(json({limit: '20mb'}))
app.use(urlencoded({extended: true, limit: '20mb'}))
app.use(sanitizeBodys)

app.use('/feature', featureRouter)
app.get('/health', (req, res) => {
  res.status(200).json({status: 'Healthy', timestamp: new Date().toISOString()})
})

export default app
