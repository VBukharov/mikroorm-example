import connection from '../orm-connection';
import {Dictionary} from "../entity/Dictionary";


class DictionaryServiceClass {

    getValue(key: string): Promise<number> {
        return connection
            .then(async config => {
                const result = await config.em.findOne(Dictionary, {key: key});
                return result.value
            })
        ;
    }

    updateValue(key: string, value: number): Promise<void> {
        return connection
            .then(async config => {
                const result = await config.em.findOne(Dictionary, {key: key});
                result.value = value;
                await config.em.flush();
            })
            .catch((err: any) => {throw err});
    }
}

const dictionaryService = new DictionaryServiceClass();


export {DictionaryServiceClass, dictionaryService};