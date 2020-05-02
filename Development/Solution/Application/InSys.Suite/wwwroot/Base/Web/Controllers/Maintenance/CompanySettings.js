﻿angular.module('app')
    .controller('MaintenanceCompanySettings', ['$scope', '$controller', '$priv', '$state', function ($s, $c, $priv, $st) {
        $c('insysTableController', { $scope: $s });
        $s.MenuPrivileges = $priv.Data;
        $s.Schema = {};
        $s.SelectedId = 0;
        $s.RecordID = $st.params.ID == undefined ? '' : $st.params.ID;
        $s.TableSchema = [];

        $s.tblOptions = {
            Columns: [
                { Name: 'Name' },
                { Name: 'Description' },
                { Name: 'Address' },
                { Name: 'LandlineNo', Label: 'Landline/Fax No.' },
                { Name: 'MobileNo', Label: 'Mobile No.' },
                { Name: 'EmailAddress', Label: 'Email Address' },
                { Name: 'IsActive', Label: 'Active' }
            ],
            HasNew: $s.MenuPrivileges.HasNew,
            HasDelete: $s.MenuPrivileges.HasDelete,
            HasEdit: $s.MenuPrivileges.HasEdit,
            Filters: [
                { Name: 'Name', Type: 9 },
                { Name: 'Description', Type: 9 },
                { Name: 'Address', Type: 9 },
                { Name: 'LandlineNo', Type: 9, Label: 'Landline/Fax No.' },
                { Name: 'MobileNo', Type: 9, Label: 'Mobile No.' },
                { Name: 'EmailAddress', Type: 9, Label: 'Email Address' },
                { Name: 'IsActive', Type: 1, ControlType: 'radio', Label: 'Active' }
            ]
        };

        $s.Init = function () {
            if ($s.RecordID != '') {
                $s.SetSystemStatus('Loading record #' + $s.RecordID, 'loading');
                $s.LoadForm().then(function (ret) {
                    if (ret.Type == 2) {
                        $s.SetSystemStatus(ret.Message, 'error');
                    } else {
                        $s.TableSchema = ret.Data.Schema;
                        $s.Schema = $s.PlotDefault(ret.Data.Form, ret.Data.Schema, $s.RecordID);
                        $s.SetSystemStatus('Ready');
                    }
                    $s.$apply();
                })
            } else {
                $s.LoadTable($s.tblOptions, 'LoadList', 'CompanySettings', { MenuCode: 'MaintenanceCompanySettings' }).then(function (ret) {
                    if (ret.Type == 2) {
                        $s.SetSystemStatus(ret.Message);
                    } else {
                        $s.SetSystemStatus('Ready');
                    }
                    $s.$apply();
                });
            }
        }

        $s.LoadForm = function () {
            return $s.Request('LoadForm', { ID: $s.RecordID, MenuCode: 'MaintenanceCompanySettings' }, 'CompanySettings');
        }

        $s.saveForm = function () {
            if ($s.IsTabsValid('form.companysettings')) {
                if (!$s.tblOptions.HasEdit && $s.RecordID > 0) {
                    $s.Prompt('You are not allowed to update this record.');
                    return;
                }
                $s.SetSystemStatus('Saving record #' + $s.RecordID, 'loading');
                $s.Request('SaveForm', { Data: $s.Schema, MenuCode: 'MaintenanceCompanySettings' }, 'CompanySettings').then(function (ret) {
                    if (ret.Type == 2) {
                        $s.SetSystemStatus(ret.Message, 'error');
                        $s.$apply();
                    } else {
                        $s.SetSystemStatus('Successfully Saved.', 'success', true);
                        $s.SetDirtyFormToFalse($s.form);
                        $st.go($st.current.name, { ID: ret.Data.ID }, { reload: true });
                    }
                });
            }
        }

        $s.delete = function () {
            $s.deleteRow('DeleteRecord', 'CompanySettings', { MenuCode: 'MaintenanceCompanySettings' })
        }

        $s.SetSystemStatus('Loading table', 'loading');
        $s.Init();
    }]);