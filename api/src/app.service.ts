import { Injectable } from '@nestjs/common';
import { Connection, getRepository } from 'typeorm';
import { Cook } from './app.entity';

@Injectable()
export class AppService {
    constructor(protected connection: Connection) {
    }

    sortByTitle(a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }

    findChilds(parent, list) {
        const hasChilds: boolean = list.some(el => el.parentId === parent.id);
        if (!hasChilds) {
            return parent;
        }

        let result = parent;
        result.nodeChilds = list
            .filter(el => el.parentId === parent.id)
            .map(el => this.findChilds(el, list))
            .sort(this.sortByTitle);
        return result;
    }

    async getCookList() {
        const cookList = await this.connection
            .createQueryBuilder()
            .from('Cook', 'cb')
            .getRawMany();

        return cookList
            .filter(el => !el.parentId)
            .sort(this.sortByTitle)
            .map(el => this.findChilds(el, cookList));
    }

    async addCook(data) {
        const cook = new Cook();
        cook.title = data.title;
        cook.description = data.description;
        cook.parentId = data.parentId;
        await this.connection.manager.save(cook);

        return this.getCookList();
    }

    async editCook(id, data) {
        await this.connection
            .createQueryBuilder()
            .update('Cook')
            .set({
                title: data.title,
                description: data.description,
            })
            .where("id = :id", {id})
            .execute();

        return this.getCookList();
    }
}
