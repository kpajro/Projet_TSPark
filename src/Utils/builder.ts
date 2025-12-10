import * as services from "../Services"
import { Express } from "express"

export function builder(app: Express, controllers: Record<string, any>){
    Object.values(controllers).forEach(controllerclass => {
        const controller = controllerclass.name.replace("Controller", "")

        const service = `${controller}Service`
        const serviceClass = (services as any)[service]

        if(!serviceClass){
            throw new Error(`Missing Service: ${service}`)
        }

        const _service = new serviceClass()
        const _controller = new controllerclass(_service)

        const route = `/${controller.toLowerCase()}`
        app.use(route, _controller.buildRouter())
    })
}