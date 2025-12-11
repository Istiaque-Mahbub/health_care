
type IOptions = {
    page?:string | number
    limit?:string | number
    sortBy?:string
    sortOrder?:string
}
type IOptionsResult = {
    page:number
    limit: number
    skip:number
    sortBy:string
    sortOrder:string
}

const calculatedPagination = (options:IOptions):IOptionsResult =>{
    const page = Number(options.page) || 1
    const limit = Number(options.limit) || 10
    const skip = (Number(page)-1) * limit
    const sortBy : string = options.sortBy || "createdAt"
    const sortOrder : string = options.sortOrder || "desc"

    return{
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
}

export const paginationHelper ={
calculatedPagination
}