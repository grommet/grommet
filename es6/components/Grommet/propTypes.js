import PropTypes from 'prop-types';
import { backgroundDoc } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    background: backgroundDoc,
    dir: PropTypes.oneOf(['rtl']),
    full: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['min'])]),
    options: PropTypes.shape({
      layer: PropTypes.shape({
        singleId: PropTypes.bool
      }),
      drop: PropTypes.shape({
        checkContainingBlock: PropTypes.bool
      })
    }),
    plain: PropTypes.bool,
    cssVars: PropTypes.bool,
    theme: PropTypes.object,
    themeMode: PropTypes.oneOf(['dark', 'light', 'auto']),
    userAgent: PropTypes.string,
    containerTarget: PropTypes.object,
    messages: PropTypes.shape({
      format: PropTypes.func,
      messages: PropTypes.shape({
        button: PropTypes.shape({
          busy: PropTypes.string,
          success: PropTypes.string
        }),
        calendar: PropTypes.shape({
          previousMove: PropTypes.string,
          previous: PropTypes.string,
          nextMove: PropTypes.string,
          next: PropTypes.string
        }),
        carousel: PropTypes.shape({
          previous: PropTypes.string,
          next: PropTypes.string,
          jump: PropTypes.string
        }),
        dateInput: PropTypes.shape({
          openCalendar: PropTypes.string,
          enterCalendar: PropTypes.string,
          exitCalendar: PropTypes.string
        }),
        dataChart: PropTypes.shape({
          detailTitle: PropTypes.string,
          detailFocus: PropTypes.string
        }),
        dataFilters: PropTypes.shape({
          clear: PropTypes.string,
          heading: PropTypes.string,
          open: PropTypes.string,
          openSet: PropTypes.shape({
            singular: PropTypes.string,
            plural: PropTypes.string
          })
        }),
        dataForm: PropTypes.shape({
          submit: PropTypes.string
        }),
        dataSearch: PropTypes.shape({
          label: PropTypes.string,
          open: PropTypes.string
        }),
        dataSort: PropTypes.shape({
          ascending: PropTypes.string,
          by: PropTypes.string,
          descending: PropTypes.string,
          direction: PropTypes.string,
          open: PropTypes.string
        }),
        dataSummary: PropTypes.shape({
          filtered: PropTypes.string,
          filteredSingle: PropTypes.string,
          items: PropTypes.string,
          itemsSingle: PropTypes.string,
          selected: PropTypes.string,
          total: PropTypes.string,
          totalSingle: PropTypes.string
        }),
        dataTable: PropTypes.shape({
          ascending: PropTypes.string,
          collapse: PropTypes.string,
          collapseAll: PropTypes.string,
          decrease: PropTypes.string,
          descending: PropTypes.string,
          increase: PropTypes.string,
          expand: PropTypes.string,
          expandAll: PropTypes.string,
          resizerAria: PropTypes.string,
          rows: PropTypes.string,
          rowsChanged: PropTypes.string,
          rowsSingle: PropTypes.string,
          searchBy: PropTypes.string,
          total: PropTypes.string,
          totalSingle: PropTypes.string
        }),
        dataTableColumns: PropTypes.shape({
          open: PropTypes.string,
          order: PropTypes.string,
          pinned: PropTypes.string,
          select: PropTypes.string,
          tip: PropTypes.string,
          selectAria: PropTypes.string,
          orderAria: PropTypes.string
        }),
        dataTableGroupBy: PropTypes.shape({
          clear: PropTypes.string,
          label: PropTypes.string
        }),
        dataView: PropTypes.shape({
          label: PropTypes.string
        }),
        fileInput: PropTypes.shape({
          alert: PropTypes.shape({
            maxFile: PropTypes.string,
            maxSize: PropTypes.string
          }),
          browse: PropTypes.string,
          dropPrompt: PropTypes.string,
          dropPromptMultiple: PropTypes.string,
          files: PropTypes.string,
          maxFile: PropTypes.string,
          maxSizeSingle: PropTypes.string,
          maxSizeMultiple: PropTypes.shape({
            singular: PropTypes.string,
            plural: PropTypes.string
          }),
          remove: PropTypes.string,
          removeAll: PropTypes.string
        }),
        form: PropTypes.shape({
          invalid: PropTypes.string,
          required: PropTypes.string
        }),
        formField: PropTypes.shape({
          maxCharacters: PropTypes.shape({
            remaining: PropTypes.shape({
              singular: PropTypes.string,
              plural: PropTypes.string
            }),
            overLimit: PropTypes.shape({
              singular: PropTypes.string,
              plural: PropTypes.string
            })
          })
        }),
        list: PropTypes.shape({
          pinned: PropTypes.string
        }),
        menu: PropTypes.shape({
          openMenu: PropTypes.string,
          closeMenu: PropTypes.string
        }),
        meter: PropTypes.shape({
          bar: PropTypes.shape({
            singular: PropTypes.string,
            plural: PropTypes.string
          }),
          circle: PropTypes.shape({
            singular: PropTypes.string,
            plural: PropTypes.string
          }),
          pie: PropTypes.shape({
            singular: PropTypes.string,
            plural: PropTypes.string
          }),
          semicirlce: PropTypes.shape({
            singular: PropTypes.string,
            plural: PropTypes.string
          })
        }),
        notifcation: PropTypes.shape({
          close: PropTypes.string
        }),
        pagination: PropTypes.shape({
          stepLabel: PropTypes.string,
          summary: PropTypes.string,
          summaryNoItems: PropType.string
        }),
        rangeSelector: PropTypes.shape({
          lower: PropTypes.string,
          upper: PropTypes.string
        }),
        select: PropTypes.shape({
          multiple: PropTypes.string,
          selected: PropTypes.string
        }),
        selectMultiple: PropTypes.shape({
          clearAll: PropTypes.string,
          clearAllA11y: PropTypes.string,
          open: PropTypes.string,
          optionSelected: PropTypes.string,
          optionNotSelected: PropTypes.string,
          search: PropTypes.string,
          selectAll: PropTypes.string,
          selectAllA11y: PropTypes.string,
          selected: PropTypes.string,
          selectedOfTotal: PropTypes.string,
          selectDrop: PropTypes.string,
          selectedOptions: PropTypes.string,
          showMore: PropTypes.string,
          summarizedValue: PropTypes.string
        }),
        skipLinks: PropTypes.shape({
          skipTo: PropTypes.string
        }),
        tabs: PropTypes.shape({
          tabContents: PropTypes.string
        }),
        tag: PropTypes.shape({
          removeLabel: PropTypes.shape({
            nameAndValue: PropTypes.string,
            valueOnly: PropTypes.string
          })
        }),
        textInput: PropTypes.shape({
          enterSelect: PropTypes.string,
          suggestionsCount: PropTypes.string,
          suggestionsExist: PropTypes.string,
          suggestionIsOpen: PropTypes.string
        }),
        video: PropTypes.shape({
          audioDescriptions: PropTypes.string,
          captions: PropTypes.string,
          closeMenu: PropTypes.string,
          description: PropTypes.string,
          fullScreen: PropTypes.string,
          progressMeter: PropTypes.string,
          scrubber: PropTypes.string,
          openMenu: PropTypes.string,
          pauseButton: PropTypes.string,
          playButton: PropTypes.string,
          volumeDown: PropTypes.string,
          volumeUp: PropTypes.string
        })
      }),
      onAnalytics: PropTypes.func
    })
  };
}
export var GrommetPropTypes = PropType;