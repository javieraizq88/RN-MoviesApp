
export abstract class HttpAdapter {

    // TODO espera que el GET traiga un string o unknow
    abstract get<T>(url: string, options?: Record<string, unknown> ): Promise<T>
    
    }

    