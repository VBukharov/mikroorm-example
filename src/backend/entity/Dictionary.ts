import {Entity, PrimaryKey, Property} from "mikro-orm";

@Entity({tableName: 'dictionary'})
export class Dictionary {
    @PrimaryKey({type: 'number'})
    id: number;

    @Property({type: 'string'})
    key!: string;

    @Property({type: 'number'})
    value!: number;

    constructor(key: string, value: number) {
        this.key = key;
        this.value = value;
    }
}
