"use strict";

exports.__esModule = true;
exports.GrommetPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    background: _generalPropTypes.backgroundDoc,
    dir: _propTypes["default"].oneOf(['rtl']),
    full: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['min'])]),
    options: _propTypes["default"].shape({
      layer: _propTypes["default"].shape({
        singleId: _propTypes["default"].bool
      }),
      drop: _propTypes["default"].shape({
        checkContainingBlock: _propTypes["default"].bool
      })
    }),
    plain: _propTypes["default"].bool,
    cssVars: _propTypes["default"].bool,
    theme: _propTypes["default"].object,
    themeMode: _propTypes["default"].oneOf(['dark', 'light', 'auto']),
    userAgent: _propTypes["default"].string,
    containerTarget: _propTypes["default"].object,
    messages: _propTypes["default"].shape({
      format: _propTypes["default"].func,
      messages: _propTypes["default"].shape({
        button: _propTypes["default"].shape({
          busy: _propTypes["default"].string,
          success: _propTypes["default"].string
        }),
        calendar: _propTypes["default"].shape({
          previousMove: _propTypes["default"].string,
          previous: _propTypes["default"].string,
          nextMove: _propTypes["default"].string,
          next: _propTypes["default"].string
        }),
        carousel: _propTypes["default"].shape({
          previous: _propTypes["default"].string,
          next: _propTypes["default"].string,
          jump: _propTypes["default"].string
        }),
        dateInput: _propTypes["default"].shape({
          openCalendar: _propTypes["default"].string,
          enterCalendar: _propTypes["default"].string,
          exitCalendar: _propTypes["default"].string
        }),
        dataChart: _propTypes["default"].shape({
          detailTitle: _propTypes["default"].string,
          detailFocus: _propTypes["default"].string
        }),
        dataFilters: _propTypes["default"].shape({
          clear: _propTypes["default"].string,
          heading: _propTypes["default"].string,
          open: _propTypes["default"].string,
          openSet: _propTypes["default"].shape({
            singular: _propTypes["default"].string,
            plural: _propTypes["default"].string
          })
        }),
        dataForm: _propTypes["default"].shape({
          submit: _propTypes["default"].string
        }),
        dataSearch: _propTypes["default"].shape({
          label: _propTypes["default"].string,
          open: _propTypes["default"].string
        }),
        dataSort: _propTypes["default"].shape({
          ascending: _propTypes["default"].string,
          by: _propTypes["default"].string,
          descending: _propTypes["default"].string,
          direction: _propTypes["default"].string,
          open: _propTypes["default"].string
        }),
        dataSummary: _propTypes["default"].shape({
          filtered: _propTypes["default"].string,
          filteredSingle: _propTypes["default"].string,
          items: _propTypes["default"].string,
          itemsSingle: _propTypes["default"].string,
          selected: _propTypes["default"].string,
          total: _propTypes["default"].string,
          totalSingle: _propTypes["default"].string
        }),
        dataTable: _propTypes["default"].shape({
          ascending: _propTypes["default"].string,
          collapse: _propTypes["default"].string,
          collapseAll: _propTypes["default"].string,
          decrease: _propTypes["default"].string,
          descending: _propTypes["default"].string,
          increase: _propTypes["default"].string,
          expand: _propTypes["default"].string,
          expandAll: _propTypes["default"].string,
          resizerAria: _propTypes["default"].string,
          rows: _propTypes["default"].string,
          rowsChanged: _propTypes["default"].string,
          rowsSingle: _propTypes["default"].string,
          searchBy: _propTypes["default"].string,
          total: _propTypes["default"].string,
          totalSingle: _propTypes["default"].string
        }),
        dataTableColumns: _propTypes["default"].shape({
          open: _propTypes["default"].string,
          order: _propTypes["default"].string,
          pinned: _propTypes["default"].string,
          select: _propTypes["default"].string,
          tip: _propTypes["default"].string,
          selectAria: _propTypes["default"].string,
          orderAria: _propTypes["default"].string
        }),
        dataTableGroupBy: _propTypes["default"].shape({
          clear: _propTypes["default"].string,
          label: _propTypes["default"].string
        }),
        dataView: _propTypes["default"].shape({
          label: _propTypes["default"].string
        }),
        fileInput: _propTypes["default"].shape({
          alert: _propTypes["default"].shape({
            maxFile: _propTypes["default"].string,
            maxSize: _propTypes["default"].string
          }),
          browse: _propTypes["default"].string,
          dropPrompt: _propTypes["default"].string,
          dropPromptMultiple: _propTypes["default"].string,
          files: _propTypes["default"].string,
          maxFile: _propTypes["default"].string,
          maxSizeSingle: _propTypes["default"].string,
          maxSizeMultiple: _propTypes["default"].shape({
            singular: _propTypes["default"].string,
            plural: _propTypes["default"].string
          }),
          remove: _propTypes["default"].string,
          removeAll: _propTypes["default"].string
        }),
        form: _propTypes["default"].shape({
          invalid: _propTypes["default"].string,
          required: _propTypes["default"].string
        }),
        formField: _propTypes["default"].shape({
          maxCharacters: _propTypes["default"].shape({
            remaining: _propTypes["default"].shape({
              singular: _propTypes["default"].string,
              plural: _propTypes["default"].string
            }),
            overLimit: _propTypes["default"].shape({
              singular: _propTypes["default"].string,
              plural: _propTypes["default"].string
            })
          })
        }),
        list: _propTypes["default"].shape({
          pinned: _propTypes["default"].string
        }),
        menu: _propTypes["default"].shape({
          openMenu: _propTypes["default"].string,
          closeMenu: _propTypes["default"].string
        }),
        meter: _propTypes["default"].shape({
          bar: _propTypes["default"].shape({
            singular: _propTypes["default"].string,
            plural: _propTypes["default"].string
          }),
          circle: _propTypes["default"].shape({
            singular: _propTypes["default"].string,
            plural: _propTypes["default"].string
          }),
          pie: _propTypes["default"].shape({
            singular: _propTypes["default"].string,
            plural: _propTypes["default"].string
          }),
          semicirlce: _propTypes["default"].shape({
            singular: _propTypes["default"].string,
            plural: _propTypes["default"].string
          })
        }),
        notifcation: _propTypes["default"].shape({
          close: _propTypes["default"].string
        }),
        pagination: _propTypes["default"].shape({
          stepLabel: _propTypes["default"].string,
          summary: _propTypes["default"].string,
          summaryNoItems: PropType.string
        }),
        rangeSelector: _propTypes["default"].shape({
          lower: _propTypes["default"].string,
          upper: _propTypes["default"].string
        }),
        select: _propTypes["default"].shape({
          multiple: _propTypes["default"].string,
          selected: _propTypes["default"].string
        }),
        selectMultiple: _propTypes["default"].shape({
          clearAll: _propTypes["default"].string,
          clearAllA11y: _propTypes["default"].string,
          open: _propTypes["default"].string,
          optionSelected: _propTypes["default"].string,
          optionNotSelected: _propTypes["default"].string,
          search: _propTypes["default"].string,
          selectAll: _propTypes["default"].string,
          selectAllA11y: _propTypes["default"].string,
          selected: _propTypes["default"].string,
          selectedOfTotal: _propTypes["default"].string,
          selectDrop: _propTypes["default"].string,
          selectedOptions: _propTypes["default"].string,
          showMore: _propTypes["default"].string,
          summarizedValue: _propTypes["default"].string
        }),
        skipLinks: _propTypes["default"].shape({
          skipTo: _propTypes["default"].string
        }),
        tabs: _propTypes["default"].shape({
          tabContents: _propTypes["default"].string
        }),
        tag: _propTypes["default"].shape({
          removeLabel: _propTypes["default"].shape({
            nameAndValue: _propTypes["default"].string,
            valueOnly: _propTypes["default"].string
          })
        }),
        textInput: _propTypes["default"].shape({
          enterSelect: _propTypes["default"].string,
          suggestionsCount: _propTypes["default"].string,
          suggestionsExist: _propTypes["default"].string,
          suggestionIsOpen: _propTypes["default"].string
        }),
        video: _propTypes["default"].shape({
          audioDescriptions: _propTypes["default"].string,
          captions: _propTypes["default"].string,
          closeMenu: _propTypes["default"].string,
          description: _propTypes["default"].string,
          fullScreen: _propTypes["default"].string,
          progressMeter: _propTypes["default"].string,
          scrubber: _propTypes["default"].string,
          openMenu: _propTypes["default"].string,
          pauseButton: _propTypes["default"].string,
          playButton: _propTypes["default"].string,
          volumeDown: _propTypes["default"].string,
          volumeUp: _propTypes["default"].string
        })
      }),
      onAnalytics: _propTypes["default"].func
    })
  };
}
var GrommetPropTypes = exports.GrommetPropTypes = PropType;