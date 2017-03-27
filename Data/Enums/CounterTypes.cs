using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public enum CounterTypes
    {
        /// <summary>
        /// Холодная вода
        /// </summary>
        ColdWater = 1,

        /// <summary>
        /// Горячая вода
        /// </summary>
        HotWater = 2,

        /// <summary>
        /// Электричество
        /// </summary>
        Electricity = 3,

        /// <summary>
        /// Газ
        /// </summary>
        Gas = 4,

        /// <summary>
        /// Отопление
        /// </summary>
        Heating = 5,

        /// <summary>
        /// Моторесурс
        /// </summary>
        MotorResource = 6
    }
}
