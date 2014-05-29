'use strict';

var AnalyzerQueriesController = function ($scope, $http) {
    $scope.query = {};
    $scope.deleteNotification = false;
    $scope.editMode = false;

    $scope.fetchQueriesList = function () {
        $http.get('analyzer_queries').success(function (queries) {
            $scope.queriesList = queries;
        });
    }

    $scope.addQuery = function (query) {

        $scope.resetError();

        $http.post('analyzer_queries', query).success(function () {
            $scope.fetchQueriesList();
            $scope.resetQueriesForm();
        }).error(function () {
                $scope.setError('Could not add a new query');
            });
    }

    $scope.updateQuery = function (query) {
        $scope.resetError();

        $http.put('analyzer_queries', query).success(function () {
            $scope.fetchQueriesList();
            $scope.resetQueriesForm();
        }).error(function () {
                $scope.setError('Could not update the query');
            });
    }

    $scope.editQuery = function (query) {
        $scope.resetError();
        $scope.query = query;
        $scope.editMode = true;
    }

    $scope.remove = function (id) {
        $scope.resetError();

        $http.delete('analyzer_queries/' + id).success(function () {
            $scope.fetchQueriesList();
        }).error(function () {
                $scope.setError('Could not remove query');
            });
        $scope.showDeleteNotification(false);
    }

//    $scope.removeAllRailwayStations = function() {
//        $scope.resetError();
//
//        $http.delete('queries/removeAll').success(function() {
//            $scope.fetchRailwayStationsList();
//        }).error(function() {
//            $scope.setError('Could not remove all RailwayStations');
//        });
//
//    };

    $scope.resetQueriesForm = function () {
        $scope.resetError();
        $scope.query = {};
        $scope.editMode = false;
    }

    $scope.resetError = function () {
        $scope.error = false;
        $scope.errorMessage = '';
    }

    $scope.setError = function (message) {
        $scope.error = true;
        $scope.errorMessage = message;
    }

    $scope.showDeleteNotification = function (show, id) {
        if (show === true) {
            $scope.deleteNotification = true;
        } else {
            $scope.deleteNotification = false;
        }
        $scope.deleteId = id;
    };

    $scope.fetchQueriesList();

    $scope.predicate = 'queryPattern';
}