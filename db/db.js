import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("db.db")

function querySql(query, args) {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(query, args,
                    (_, data) => {
                        resolve(data)
                    },
                    (_, err) => {
                        reject(err)
                    })
            }
        )
    })
}

export function dropDatabase() {
    return querySql("drop table if exists favorites")
}

export async function loadDatabase() {
    return querySql("create table if not exists favorites (id integer primary key not null, title text, vote_average integer, poster_path text, release_date text, overview text)", [])
}

export function deleteFavorite(id) {
    return querySql("delete from favorites where id = ?", [id])
}

export function getFavById(id) {
    return querySql("select * from favorites where id = ?", [id])
}

export function getFavorites() {
    return querySql("select * from favorites", null)
}

export function insertFavorites(id, title, vote_average, poster_path, release_date, overview) {
    return querySql("insert into favorites(id, title, vote_average, poster_path, release_date, overview) values(?, ?, ?, ?, ?, ?)", [id, title, vote_average, poster_path, release_date, overview])
}