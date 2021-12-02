export type Value={
    time: string,
    value: string,
}

export type Temperature={
    unit: string,
    values: Value[]
}

export type Power ={
    unit: string,
    values: Value[]
}

export type Data ={
    temperature:{
        unit: string,
        values: Value[]
    },
    power:{
        unit: string,
        values: Value[]
    }
}

export type ArrayDataGraphic ={
    time?: string,
    power?: string,
    temperature?: string
}