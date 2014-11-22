define([
    'jquery', 'js/common_helpers/template_helpers', 'js/edxnotes/collections/tabs',
    'js/edxnotes/views/tabs_list', 'js/spec/edxnotes/custom_matchers', 'jasmine-jquery'
], function($, TemplateHelpers, TabsCollection, TabsListView, customMatchers) {
    'use strict';
    describe('EdxNotes TabsListView', function() {
        beforeEach(function () {
            customMatchers(this);
            TemplateHelpers.installTemplate('templates/edxnotes/tab-item');
            this.collection = new TabsCollection([
                {'class_name': 'first-item'},
                {'class_name': 'second-item'}
            ]);
            this.tabsList = new TabsListView({
                collection: this.collection
            }).render();
        });

        it('has correct order and class names', function () {
            var firstItem = this.tabsList.$('.first-item'),
                secondItem = this.tabsList.$('.second-item');

            expect(firstItem).toHaveIndex(0);
            expect(firstItem).toHaveClass('is-active');
            expect(secondItem).toHaveIndex(1);
        });

        it('can add a new tab', function () {
            var firstItem = this.tabsList.$('.first-item'),
                thirdItem;

            this.collection.add({'class_name': 'third-item'});
            thirdItem = this.tabsList.$('.third-item');

            expect(firstItem).toHaveClass('is-active'); // first tab is still active
            expect(thirdItem).toHaveIndex(2);
            expect(this.tabsList.$('.tab-item')).toHaveLength(3);
        });

        it('can remove tabs', function () {
            var secondItem = this.tabsList.$('.second-item');

            this.collection.at(0).destroy(); // remove first tab
            expect(this.tabsList.$('.tab-item')).toHaveLength(1);
            expect(secondItem).toHaveClass('is-active'); // second tab becomes active
            this.collection.at(0).destroy();
            expect(this.tabsList.$('.tab-item')).toHaveLength(0);
        });
    });
});