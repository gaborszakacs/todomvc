class TodoPage {
    get input() { return $('.new-todo'); }

    open() {
        browser.url('');
        this.input.waitForVisible();
    }
}

module.exports = new TodoPage();
