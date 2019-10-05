
export class RepositoryFilters {

    constructor(filters) {
        this.filters = filters
    }

    getQueryFilter() {
        return this.filters
            .flatMap(filter => filter.getQueryFilter())
            .join('&')
    }

    hasFilters() {
        return this.getQueryFilter() !== ''
    }
}

export class ContainsWordFilter {
    constructor(words) {
        this.words = words
    }
    getQueryFilter() {
        let queryFilters = []
        if (this.words) {
            queryFilters.push('containsWordFilter.words=' + this.words.replace(/' '/g, '+'))
        }
        return queryFilters
    }
}

export class LanguageFilter {
    constructor(language) {
        this.language = language
    }
    getQueryFilter() {
        let queryFilters = []
        if (this.language) {
            queryFilters.push('languageFilter.mainLanguage=' + this.language)
        }
        return queryFilters
    }
}

class MinMaxFilter {
    constructor(min, max) {
        this.min = min
        this.max = max
    }
}

export class SizeFilter extends MinMaxFilter {
    getQueryFilter() {
        let queryFilters = []
        if (this.min) {
            queryFilters.push('sizeFilter.minRepositorySize=' + this.min)
        }
        if (this.max) {
            queryFilters.push('sizeFilter.maxRepositorySize=' + this.max)
        }
        return queryFilters
    }
}
export class StarsFilter extends MinMaxFilter {
    getQueryFilter() {
        let queryFilters = []
        if (this.min) {
            queryFilters.push('starsFilter.minStars=' + this.min)
        }
        if (this.max) {
            queryFilters.push('starsFilter.maxStars=' + this.max)
        }
        return queryFilters
    }
}
export class ForksFilter extends MinMaxFilter {
    getQueryFilter() {
        let queryFilters = []
        if (this.min) {
            queryFilters.push('forksFilter.minForks=' + this.min)
        }
        if (this.max) {
            queryFilters.push('forksFilter.maxForks=' + this.max)
        }
        return queryFilters
    }
}